import { AddImageToTrainingSetResolver } from 'types/addImageToTrainingSet'

import { db } from 'src/lib/db'

export const addImageToTrainingSet: AddImageToTrainingSetResolver = async ({
  input,
}) => {
  let trainingSetId = input.trainingSetId
  let version = 1
  const trainingSet = await db.trainingSet.findUnique({
    where: { id: input.trainingSetId },
  })

  if (!trainingSetId) {
    const trainingSet = await db.trainingSet.create({
      data: {
        version,
      },
    })
    trainingSetId = trainingSet.id
  }

  if (input.newVersion) {
    if (trainingSet.version) {
      version = trainingSet.version + 1
    }
    const newTrainingSet = await db.trainingSet.create({
      data: {
        version,
      },
    })
    trainingSetId = newTrainingSet.id
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
