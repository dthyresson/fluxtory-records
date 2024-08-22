import type { RemoveImageFromTrainingSetResolver } from 'types/removeImageFromTrainingSet'

import { db } from 'src/lib/db'
import { trainingSet } from 'src/services/trainingSets/trainingSets'

export const removeImageFromTrainingSet: RemoveImageFromTrainingSetResolver =
  async ({ input }) => {
    const { imageId, trainingSetId } = input

    await db.trainingSetImage.delete({
      where: {
        trainingSetId_imageId: {
          trainingSetId,
          imageId,
        },
      },
    })

    const t = await trainingSet({ id: trainingSetId })

    return t
  }
