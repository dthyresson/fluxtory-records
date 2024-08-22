import { AddImageToTrainingSetResolver } from 'types/addImageToTrainingSet'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { currentTrainingSet } from './currentTrainingSet'

export const addImageToTrainingSet: AddImageToTrainingSetResolver = async ({
  input,
}) => {
  let trainingSet = null
  let trainingSetId = input.trainingSetId
  const version = (await currentTrainingSet())?.version || 1

  if (input.trainingSetId) {
    const trainingSet = await db.trainingSet.findUnique({
      where: { id: input.trainingSetId },
    })
    if (trainingSet) {
      trainingSetId = trainingSet.id
    }
  } else if (input.newVersion) {
    const newTrainingSet = await db.trainingSet.create({
      data: {
        version: version + 1,
      },
    })
    trainingSetId = newTrainingSet.id
  } else {
    trainingSet = await db.trainingSet.create({
      data: {
        version: version + 1,
      },
    })
    trainingSetId = trainingSet.id
  }
  const TRIGGER = 'fktry-rcrd'
  const image = await db.image.findUnique({
    where: { id: input.imageId },
    include: {
      release: {
        include: {
          artist: true,
          genre: true,
          style: true,
        },
      },
    },
  })

  const release = image?.release

  const characteristics = [
    image?.release?.genre?.name,
    image?.release?.style?.name,
    image?.release?.year,
  ]
    .filter(Boolean)
    .join(', ')

  const caption = `a ${TRIGGER} of the ${release?.format}, "${release?.title}", by the artist "${release?.artist?.name}", ${characteristics}`

  console.log(caption)

  try {
    const t = await db.trainingSetImage.create({
      data: {
        caption,
        trainingSet: {
          connect: {
            id: trainingSetId,
          },
        },
        image: {
          connect: {
            id: input.imageId,
          },
        },
      },
      include: {
        trainingSet: true,
      },
    })

    return t.trainingSet
  } catch (error) {
    logger.error(error)
    throw new ValidationError('Image already in training set')
  }
}
