import type {
  GenresResolver,
  GenreResolver,
  CreateGenreResolver,
  UpdateGenreResolver,
  DeleteGenreResolver,
} from 'types/genres'

import { db } from 'src/lib/db'

export const genres: GenresResolver = async () => {
  return await db.genre.findMany({
    orderBy: { id: 'asc' },
    include: {
      releases: true,
    },
  })
}

export const genre: GenreResolver = async ({ id }) => {
  return await db.genre.findUnique({
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const createGenre: CreateGenreResolver = async ({ input }) => {
  return await db.genre.create({
    data: input,
    include: {
      releases: true,
    },
  })
}

export const updateGenre: UpdateGenreResolver = async ({ id, input }) => {
  return await db.genre.update({
    data: input,
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const deleteGenre: DeleteGenreResolver = async ({ id }) => {
  return await db.genre.delete({
    where: { id },
  })
}
