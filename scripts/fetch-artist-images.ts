import fs from 'fs'
import https from 'https'
import path from 'path'

import { db } from 'api/src/lib/db'
import { getReleasesWithPrimaryImagesByArtist } from 'api/src/services/releases/releases'
import archiver from 'archiver'

// import type { Artist, Release, Image } from 'types/shared-return-types'

import { getPaths } from '@redwoodjs/project-config'

const EXPORTS_DIR = path.join(getPaths().base, 'exports', 'images')
const TRAINING_DIR = path.join(EXPORTS_DIR, 'training')

const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .slice(0, 100)
}

const downloadImage = async (
  url: string,
  filepath: string,
  retries = 7,
  delay = 2_000
): Promise<void> => {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': process.env.DISCOGS_USER_AGENT || 'MyApp/1.0',
            Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
          },
        },
        (response) => {
          if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream(filepath)
            response.pipe(fileStream)
            fileStream.on('finish', () => {
              fileStream.close()
              resolve()
            })
          } else if (response.statusCode === 429 && retries > 0) {
            console.log(`Rate limited. Retrying in ${delay / 1000} seconds...`)
            setTimeout(() => {
              downloadImage(url, filepath, retries - 1, delay * 2)
                .then(resolve)
                .catch(reject)
            }, delay)
          } else {
            reject(
              new Error(`Failed to download image: ${response.statusCode}`)
            )
          }
        }
      )
      .on('error', reject)
  })
}

const fetchArtistImages = async (artistName: string): Promise<void> => {
  const artist = await db.artist.findUnique({ where: { name: artistName } })
  if (!artist) {
    console.error(`Artist "${artistName}" not found`)
    return
  }

  const releases = await getReleasesWithPrimaryImagesByArtist(artist.id)

  console.log(
    `Found ${releases.length} releases for artist: ${artistName} (${artist.id})`
  )
  if (releases.length === 0) {
    console.error(`No releases found for artist: ${artistName}`)
    return
  }

  const imageDir = path.join(EXPORTS_DIR, sanitizeFilename(artistName))

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true })
  }

  for (const release of releases) {
    if (release.images.length > 0) {
      const image = release.images[0]
      const uri = image.uri

      if (!uri) {
        console.warn(`No URI found for image: ${image}`)
        continue
      }
      const filename = sanitizeFilename(
        `${release.discogsId}_${release.artist?.name || artistName}_${
          release.title
        }_${release.format || 'unknown format'}`
      )
      console.log(`Downloading image for "${filename}"`)

      const fileExtension = path.extname(uri).toLowerCase() || '.jpg'
      const filepath = path.join(imageDir, `${filename}${fileExtension}`)

      try {
        // don't download the same image twice
        if (fs.existsSync(filepath)) {
          console.log(`Image already exists: ${filepath}`)
          continue
        }
        await downloadImage(uri, filepath)

        // pause for a random amount of time  between .25 and 1.5 seconds
        await new Promise((resolve) =>
          setTimeout(resolve, Math.floor(Math.random() * 1500) + 250)
        )
        console.log(
          `Downloaded image for "${release.artist?.name || artistName} - ${
            release.title
          }"`
        )
      } catch (error) {
        console.error(
          `Failed to download image for "${
            release.artist?.name || artistName
          } - ${release.title}":`,
          error
        )
      }
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const zipFilename = `${sanitizeFilename(artistName)}_${timestamp}.zip`
  const zipFilepath = path.join(TRAINING_DIR, zipFilename)

  const output = fs.createWriteStream(zipFilepath)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level
  })

  output.on('close', () => {
    console.log(`Created zip archive: ${zipFilepath}`)
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)

  const files = fs.readdirSync(imageDir)
  for (const file of files) {
    const filePath = path.join(imageDir, file)
    archive.file(filePath, { name: file })
  }

  await archive.finalize()
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  let artistName = 'New Order'

  if (args.artist) {
    artistName = args.artist
  }

  console.log(`Fetching images for artist: ${artistName}`)

  try {
    await fetchArtistImages(artistName)
    console.log('Script completed successfully')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Ensure the export directories exist without modifying existing contents
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true })
}
if (!fs.existsSync(TRAINING_DIR)) {
  fs.mkdirSync(TRAINING_DIR, { recursive: true })
}
