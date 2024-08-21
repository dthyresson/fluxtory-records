import fs from 'fs'
import https from 'https'
import path from 'path'

import archiver from 'archiver'

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
