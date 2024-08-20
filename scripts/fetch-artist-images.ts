import fs from 'fs'
import path from 'path'
import https from 'https'
import zlib from 'zlib'
import { db } from 'api/src/lib/db'
import type { Artist, Release, Image } from 'types/shared-return-types'

const EXPORTS_DIR = path.join(process.cwd(), 'exports', 'images')
const TRAINING_DIR = path.join(EXPORTS_DIR, 'training')

const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 100)
}

const downloadImage = async (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          fileStream.close()
          resolve()
        })
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`))
      }
    }).on('error', reject)
  })
}

const fetchArtistImages = async (artistName: string): Promise<void> => {
  const artist = await db.artist.findUnique({ where: { name: artistName } })
  if (!artist) {
    console.error(`Artist "${artistName}" not found`)
    return
  }

  const releases = await db.release.findMany({
    where: { artistId: artist.id },
    include: {
      images: {
        where: { type: 'primary' },
        take: 1,
      },
    },
  })

  const imageDir = path.join(EXPORTS_DIR, sanitizeFilename(artistName))
  fs.mkdirSync(imageDir, { recursive: true })

  for (const release of releases) {
    if (release.images.length > 0) {
      const image = release.images[0]
      const filename = sanitizeFilename(`${release.discogsId}_${release.title}_${release.format || 'unknown'}`)
      const filepath = path.join(imageDir, `${filename}.jpg`)

      try {
        await downloadImage(image.uri, filepath)
        console.log(`Downloaded image for "${release.title}"`)
      } catch (error) {
        console.error(`Failed to download image for "${release.title}":`, error)
      }
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const zipFilename = `${sanitizeFilename(artistName)}_${timestamp}.zip`
  const zipFilepath = path.join(TRAINING_DIR, zipFilename)

  const output = fs.createWriteStream(zipFilepath)
  const archive = zlib.createGzip()

  output.on('close', () => {
    console.log(`Created zip archive: ${zipFilepath}`)
    // Clean up the temporary image directory
    fs.rmSync(imageDir, { recursive: true, force: true })
  })

  archive.pipe(output)

  const files = fs.readdirSync(imageDir)
  for (const file of files) {
    const filePath = path.join(imageDir, file)
    archive.write(fs.readFileSync(filePath), { name: file })
  }

  archive.end()
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  let artistName = 'New Order'

  if (args.artist) {
    artistName = args.artist
  } else if (args._[0]) {
    artistName = args._[0]
  }

  console.log(`Fetching images for artist: ${artistName}`)

  try {
    await fetchArtistImages(artistName)
    console.log('Script completed successfully')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Ensure the export directories exist
fs.mkdirSync(EXPORTS_DIR, { recursive: true })
fs.mkdirSync(TRAINING_DIR, { recursive: true })
