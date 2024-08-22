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

  // Create a directory for the training set in the web/public/training_sets directory
  const outputPath = path.join(
    getPaths().web.base,
    'public',
    'training_sets',
    `training_set_v${t.version}_${new Date().getTime()}.zip`
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

  logger.debug('Training set archive created', { outputPath })

  const filename = path.basename(outputPath)
  const url = filename

  return { url, trainingSet: t }
}

// Helper function to get file extension
function getFileExtension(uri: string): string {
  const match = uri.match(/\.([^.]+)$/)
  return match ? match[1] : ''
}
