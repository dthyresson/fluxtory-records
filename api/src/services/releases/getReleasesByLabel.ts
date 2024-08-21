import { db } from 'src/lib/db'

export const getReleasesByLabel = async (labelId: number) => {
  return await db.release.findMany({
    where: { labelId },
    include: {
      artist: true,
      label: true,
      images: {
        where: { type: 'primary' },
        take: 1,
      },
      style: true,
      genre: true,
    },
    orderBy: { discogsId: 'asc' },
  })
}
