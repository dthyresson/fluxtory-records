import type {
  ImagesResolver,
  ImageResolver,
  CreateImageResolver,
  UpdateImageResolver,
  DeleteImageResolver,
} from 'types/images'

import { db } from 'src/lib/db'

export const images: ImagesResolver = async () => {
  return await db.image.findMany({
    orderBy: { id: 'asc' },
    include: {
      release: true,
    },
  })
}

export const image: ImageResolver = async ({ id }) => {
  return await db.image.findUnique({
    where: { id },
    include: {
      release: true,
    },
  })
}

export const createImage: CreateImageResolver = async ({ input }) => {
  return await db.image.create({
    data: input,
    include: {
      release: true,
    },
  })
}

export const updateImage: UpdateImageResolver = async ({ id, input }) => {
  return await db.image.update({
    data: input,
    where: { id },
    include: {
      release: true,
    },
  })
}

export const deleteImage: DeleteImageResolver = async ({ id }) => {
  return await db.image.delete({
    where: { id },
  })
}
