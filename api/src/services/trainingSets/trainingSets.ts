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
      images: true,
      _count: {
        select: { images: true },
      },
    },
  })

  return sets.map((s) => ({ ...s, imagesCount: s._count.images }))
}

export const trainingSet: TrainingSetResolver = async ({ id }) => {
  const set = await db.trainingSet.findUnique({
    where: { id },
    include: {
      images: true,
      _count: {
        select: { images: true },
      },
    },
  })

  return { ...set, imagesCount: set?._count.images }
}

export const createTrainingSet: CreateTrainingSetResolver = async ({
  input,
}) => {
  const set = await db.trainingSet.create({
    data: input,
    include: {
      images: true,
      _count: {
        select: { images: true },
      },
    },
  })

  return { ...set, imagesCount: set._count.images }
}

export const updateTrainingSet: UpdateTrainingSetResolver = async ({
  id,
  input,
}) => {
  const set = await db.trainingSet.update({
    data: input,
    where: { id },
    include: {
      images: true,
      _count: {
        select: { images: true },
      },
    },
  })

  return { ...set, imagesCount: set._count.images }
}

export const deleteTrainingSet: DeleteTrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.delete({
    where: { id },
  })
}
