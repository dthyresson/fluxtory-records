import fs from 'fs'
import https from 'https'
import path from 'path'
import { getPaths } from '@redwoodjs/project-config'
import { db } from 'src/lib/db'
import { getReleasesWithPrimaryImagesByArtist } from 'src/services/releases/releases'

import archiver from 'archiver'

const EXPORTS_DIR = path.join(getPaths().base, 'exports')
const IMAGES_DIR = path.join(EXPORTS_DIR, 'images')
const CAPTIONS_DIR = path.join(EXPORTS_DIR, 'captions')

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .slice(0, 100)
}

export const downloadImage = async (
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

export const createZipArchive = async (
  sourceDir: string,
  outputPath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    output.on('close', () => {
      console.log(`Created zip archive: ${outputPath}`)
      resolve()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)

    const files = fs.readdirSync(sourceDir)
    for (const file of files) {
      const filePath = path.join(sourceDir, file)
      archive.file(filePath, { name: file })
    }

    archive.finalize()
  })
}

export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generateCaptions = async (artistName: string): Promise<void> => {
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

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const captionsFilename = `${sanitizeFilename(
    artistName
  )}_captions_${timestamp}.jsonl`
  const captionsFilepath = path.join(CAPTIONS_DIR, captionsFilename)

  const captions = releases
    .map((release) => {
      const filename = sanitizeFilename(
        `${release.discogsId}_${release.artist?.name || artistName}_${
          release.title
        }_${release.format || 'unknown format'}`
      )

      const imageFilename = `${filename}.jpeg`

      const artistDir = sanitizeFilename(artistName)
      const imagePath = path.join(IMAGES_DIR, artistDir, imageFilename)
      const imageExists = fs.existsSync(imagePath)

      if (!imageExists) {
        console.error(`Image "${imagePath}" not found`)
        return null
      }

      const cover = release.genre?.name ? `${release.genre?.name} style cover`.trim() : 'cover'
      const album = release.style?.name ? `${release.style?.name} album`.trim() : 'album'
      const caption = `In the style of Factory Records album artwork, a ${release.format} ${cover} for the ${album} "${release.title}" by ${artistName} from ${release.year}`
      return JSON.stringify({ file_name: imageFilename, text: caption })
    })
    .filter(Boolean)

  fs.writeFileSync(captionsFilepath, captions.join('\n'))
  console.log(`Generated captions file: ${captionsFilepath}`)
}
