import type {
  TrainingSetsResolver,
  TrainingSetResolver,
  CreateTrainingSetResolver,
  UpdateTrainingSetResolver,
  DeleteTrainingSetResolver,
} from 'types/trainingSets'

import { db } from 'src/lib/db'

export const trainingSets: TrainingSetsResolver = async () => {
  return await db.trainingSet.findMany({
    orderBy: { id: 'asc' },
    include: {
      images: true,
    },
  })
}

export const trainingSet: TrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.findUnique({
    where: { id },
    include: {
      images: true,
    },
  })
}

export const createTrainingSet: CreateTrainingSetResolver = async ({
  input,
}) => {
  return await db.trainingSet.create({
    data: input,
    include: {
      images: true,
    },
  })
}

export const updateTrainingSet: UpdateTrainingSetResolver = async ({
  id,
  input,
}) => {
  return await db.trainingSet.update({
    data: input,
    where: { id },
    include: {
      images: true,
    },
  })
}

export const deleteTrainingSet: DeleteTrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.delete({
    where: { id },
  })
}
