import fs from 'fs'
import path from 'path'

import archiver from 'archiver'

import { getPaths } from '@redwoodjs/project-config'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const downloadTrainingSet = async ({ id }: { id: number }) => {
  const t = await db.trainingSet.findUnique({
    where: { id },
    include: {
      trainingSetImages: {
        include: {
          image: true,
        },
      },
    },
  })

  // Create an in-memory zip file archive using archiver
  const outputPath = path.join(
    getPaths().web.base,
    'public',
    `training_set_v${t.version}_${Math.floor(Date.now() / 1000)}.zip`
  )
  const output = fs.createWriteStream(outputPath)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level
  })

  output.on('close', () => {
    logger.debug('Created zip archive', { outputPath })
  })

  archive.on('error', (err) => {
    logger.error('Error creating zip archive', { err })
  })

  archive.pipe(output)
  // Use Promise.all to wait for all async operations to complete
  await Promise.all(
    t.trainingSetImages.map(async (tsi) => {
      // Fetch image from URI
      const response = await fetch(tsi.image.uri)
      const imageBuffer = await response.arrayBuffer()
      logger.debug('Image buffer', { imageBuffer })

      // Generate unique filenames for image and caption
      const imageName = `${tsi.image.id}_image.${getFileExtension(
        tsi.image.uri
      )}`
      const captionName = `${tsi.image.id}_image.txt`

      // Add image to archive
      archive.append(Buffer.from(imageBuffer), { name: imageName })
      logger.debug('Image added to archive', { imageName })
      // Add caption to archive
      archive.append(tsi.caption, { name: captionName })
      logger.debug('Caption added to archive', { captionName })
    })
  )

  // Finalize the archive
  archive.finalize()

  logger.debug('Training set downloaded')

  const url = `file://${outputPath}`

  return { url, trainingSet: t }
}

// Helper function to get file extension
function getFileExtension(uri: string): string {
  const match = uri.match(/\.([^.]+)$/)
  return match ? match[1] : ''
}
