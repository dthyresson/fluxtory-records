import { db } from 'src/lib/db'

export const getReleasesWithPrimaryImagesByArtist = async (
  artistId: number
) => {
  return await db.release.findMany({
    where: { artistId },
    include: {
      artist: true,
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
