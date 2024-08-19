import type {
  LabelsResolver,
  LabelResolver,
  CreateLabelResolver,
  UpdateLabelResolver,
  DeleteLabelResolver,
} from 'types/labels'

import { db } from 'src/lib/db'

export const labels: LabelsResolver = async () => {
  return await db.label.findMany({
    orderBy: { id: 'asc' },
  })
}

export const label: LabelResolver = async ({ id }) => {
  return await db.label.findUnique({
    where: { id },
  })
}

export const createLabel: CreateLabelResolver = async ({ input }) => {
  return await db.label.create({
    data: input,
  })
}

export const updateLabel: UpdateLabelResolver = async ({ id, input }) => {
  return await db.label.update({
    data: input,
    where: { id },
  })
}

export const deleteLabel: DeleteLabelResolver = async ({ id }) => {
  return await db.label.delete({
    where: { id },
  })
}
