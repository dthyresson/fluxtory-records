import type {
  ArtistsResolver,
  ArtistResolver,
  CreateArtistResolver,
  UpdateArtistResolver,
  DeleteArtistResolver,
} from 'types/artists'

import { db } from 'src/lib/db'

export const artists: ArtistsResolver = async () => {
  return await db.artist.findMany({
    orderBy: { id: 'asc' },
  })
}

export const artist: ArtistResolver = async ({ id }) => {
  return await db.artist.findUnique({
    where: { id },
  })
}

export const createArtist: CreateArtistResolver = async ({ input }) => {
  return await db.artist.create({
    data: input,
  })
}

export const updateArtist: UpdateArtistResolver = async ({ id, input }) => {
  return await db.artist.update({
    data: input,
    where: { id },
  })
}

export const deleteArtist: DeleteArtistResolver = async ({ id }) => {
  return await db.artist.delete({
    where: { id },
  })
}
