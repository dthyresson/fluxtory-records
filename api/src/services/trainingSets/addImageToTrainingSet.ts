import { AddImageToTrainingSetResolver } from 'types/addImageToTrainingSet'

import { db } from 'src/lib/db'

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

  return await db.trainingSet.update({
    where: { id: trainingSetId },
    data: {
      images: {
        connect: { id: input.imageId },
      },
    },
  })
}
