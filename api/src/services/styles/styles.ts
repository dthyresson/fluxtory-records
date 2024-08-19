import type {
  StylesResolver,
  StyleResolver,
  CreateStyleResolver,
  UpdateStyleResolver,
  DeleteStyleResolver,
} from 'types/styles'

import { db } from 'src/lib/db'

export const styles: StylesResolver = async () => {
  return await db.style.findMany({
    orderBy: { id: 'asc' },
    include: {
      releases: true,
    },
  })
}

export const style: StyleResolver = async ({ id }) => {
  return await db.style.findUnique({
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const createStyle: CreateStyleResolver = async ({ input }) => {
  return await db.style.create({
    data: input,
    include: {
      releases: true,
    },
  })
}

export const updateStyle: UpdateStyleResolver = async ({ id, input }) => {
  return await db.style.update({
    data: input,
    where: { id },
    include: {
      releases: true,
    },
  })
}

export const deleteStyle: DeleteStyleResolver = async ({ id }) => {
  return await db.style.delete({
    where: { id },
  })
}
