import { db } from 'src/lib/db'

export const getPrimaryImageForRelease = async (releaseId: number) => {
  return await db.image.findFirst({
    where: {
      releaseId: releaseId,
      type: 'primary',
    },
    include: {
      release: true,
    },
  })
}
