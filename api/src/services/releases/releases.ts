import type {
  ReleasesResolver,
  ReleaseResolver,
  CreateReleaseResolver,
  UpdateReleaseResolver,
  DeleteReleaseResolver,
} from 'types/releases'

import { db } from 'src/lib/db'

export const releases: ReleasesResolver = async () => {
  return await db.release.findMany({
    orderBy: { id: 'asc' },
    include: {
      label: true,
      artist: true,
      Image: true,
      genre: true,
      style: true,
    },
  })
}

export const release: ReleaseResolver = async ({ id }) => {
  return await db.release.findUnique({
    where: { id },
    include: {
      label: true,
      artist: true,
      Image: true,
      genre: true,
      style: true,
    },
  })
}

export const createRelease: CreateReleaseResolver = async ({ input }) => {
  return await db.release.create({
    data: input,
    include: {
      label: true,
      artist: true,
      Image: true,
      genre: true,
      style: true,
    },
  })
}

export const updateRelease: UpdateReleaseResolver = async ({ id, input }) => {
  return await db.release.update({
    data: input,
    where: { id },
    include: {
      label: true,
      artist: true,
      Image: true,
      genre: true,
      style: true,
    },
  })
}

export const deleteRelease: DeleteReleaseResolver = async ({ id }) => {
  return await db.release.delete({
    where: { id },
  })
}
