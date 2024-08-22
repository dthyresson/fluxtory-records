import type {
  TrainingSetsResolver,
  TrainingSetResolver,
  CreateTrainingSetResolver,
  UpdateTrainingSetResolver,
  DeleteTrainingSetResolver,
} from 'types/trainingSets'

import { db } from 'src/lib/db'

export const trainingSets: TrainingSetsResolver = async () => {
  const sets = await db.trainingSet.findMany({
    orderBy: { version: 'desc' },
    include: {
      trainingSetImages: true,
      _count: {
        select: {
          trainingSetImages: true,
        },
      },
    },
  })
  return sets.map((set) => ({
    ...set,
    imagesCount: set._count.trainingSetImages,
  }))
}

export const trainingSet: TrainingSetResolver = async ({ id }) => {
  const set = await db.trainingSet.findUnique({
    where: { id },
    include: {
      trainingSetImages: {
        include: {
          image: true,
        },
      },
      _count: {
        select: {
          trainingSetImages: true,
        },
      },
    },
  })
  return {
    ...set,
    imagesCount: set?._count.trainingSetImages,
  }
}

export const createTrainingSet: CreateTrainingSetResolver = async ({
  input,
}) => {
  const set = await db.trainingSet.create({
    data: input,
    include: {
      trainingSetImages: true,
      _count: {
        select: {
          trainingSetImages: true,
        },
      },
    },
  })
  return {
    ...set,
    imagesCount: set?._count.trainingSetImages,
  }
}

export const updateTrainingSet: UpdateTrainingSetResolver = async ({
  id,
  input,
}) => {
  return await db.trainingSet.update({
    data: input,
    where: { id },
    include: {
      trainingSetImages: true,
    },
  })
}

export const deleteTrainingSet: DeleteTrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.delete({
    where: { id },
  })
}
