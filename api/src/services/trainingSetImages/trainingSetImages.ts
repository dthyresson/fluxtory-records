import type {
  TrainingSetImagesResolver,
  TrainingSetImageResolver,
  CreateTrainingSetImageResolver,
  UpdateTrainingSetImageResolver,
  DeleteTrainingSetImageResolver,
} from 'types/trainingSetImages'

import { db } from 'src/lib/db'

export const trainingSetImages: TrainingSetImagesResolver = async () => {
  return await db.trainingSetImage.findMany({
    orderBy: { id: 'asc' },
    include: {
      trainingSet: true,
      image: true,
    },
  })
}

export const trainingSetImage: TrainingSetImageResolver = async ({ id }) => {
  return await db.trainingSetImage.findUnique({
    where: { id },
    include: {
      trainingSet: true,
      image: true,
    },
  })
}

export const createTrainingSetImage: CreateTrainingSetImageResolver = async ({
  input,
}) => {
  return await db.trainingSetImage.create({
    data: input,
    include: {
      trainingSet: true,
      image: true,
    },
  })
}

export const updateTrainingSetImage: UpdateTrainingSetImageResolver = async ({
  id,
  input,
}) => {
  return await db.trainingSetImage.update({
    data: input,
    where: { id },
    include: {
      trainingSet: true,
      image: true,
    },
  })
}

export const deleteTrainingSetImage: DeleteTrainingSetImageResolver = async ({
  id,
}) => {
  return await db.trainingSetImage.delete({
    where: { id },
  })
}
