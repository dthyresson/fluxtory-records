import { CurrentTrainingSetResolver } from 'types/currentTrainingSet'

import { db } from 'src/lib/db'

export const currentTrainingSet: CurrentTrainingSetResolver = async () => {
  return await db.trainingSet.findFirst({
    orderBy: {
      version: 'desc',
    },
  })
}
