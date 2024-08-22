import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { generateCaptionForImage } from 'src/services/images/generateCaptionForImage'
import { trainingSet as getTrainingSet } from 'src/services/trainingSets/trainingSets'

export const updateTrainingSetCaptions = async ({ id }: { id: number }) => {
  const trainingSet = await db.trainingSet.findUnique({
    where: { id },
  })

  if (!trainingSet) {
    logger.error(`Training set not found: ${id}`)
    throw new ValidationError('Training set not found')
  }

  const trainingSetImages = await db.trainingSetImage.findMany({
    where: { trainingSetId: id },
  })

  for (const trainingSetImage of trainingSetImages) {
    const caption = await generateCaptionForImage(trainingSetImage.imageId)
    await db.trainingSetImage.update({
      where: { id: trainingSetImage.id },
      data: { caption },
    })
  }

  const updatedTrainingSet = await getTrainingSet({ id })

  return updatedTrainingSet
}
