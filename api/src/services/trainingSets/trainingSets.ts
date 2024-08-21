import type {
  TrainingSetsResolver,
  TrainingSetResolver,
  CreateTrainingSetResolver,
  UpdateTrainingSetResolver,
  DeleteTrainingSetResolver,
  LatestTrainingSetVersionResolver,
} from 'types/trainingSets'

import { db } from 'src/lib/db'

export const trainingSets: TrainingSetsResolver = async () => {
  return await db.trainingSet.findMany({
    orderBy: { id: 'asc' },
    include: {
      releases: true,
    },
  })
}

export const trainingSet: TrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.findUnique({
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const latestTrainingSetVersion: LatestTrainingSetVersionResolver = async () => {
  const latestTrainingSet = await db.trainingSet.findFirst({
    orderBy: { version: 'desc' },
  })
  return latestTrainingSet ? latestTrainingSet.version : 0
}

export const createTrainingSet: CreateTrainingSetResolver = async ({
  input,
}) => {
  const { releaseIds, ...trainingSetData } = input

  return await db.trainingSet.create({
    data: {
      ...trainingSetData,
      releases: {
        connect: releaseIds.map((id) => ({ id })),
      },
    },
    include: {
      releases: true,
    },
  })
}

export const updateTrainingSet: UpdateTrainingSetResolver = async ({
  id,
  input,
}) => {
  // Note: This function might need to be updated to handle release associations
  // if that functionality is required in the future.

  return await db.trainingSet.update({
    data: input,
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const deleteTrainingSet: DeleteTrainingSetResolver = async ({ id }) => {
  return await db.trainingSet.delete({
    where: { id },
  })
}
