import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Label as RTLabel } from './shared-return-types'
import type {
  CreateLabelInput,
  UpdateLabelInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: labels: [Label!]! */
export interface LabelsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTLabel[]>
}

/** SDL: label(id: Int!): Label */
export interface LabelResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTLabel | null>
}

/** SDL: createLabel(input: CreateLabelInput!): Label! */
export interface CreateLabelResolver {
  (
    args: { input: CreateLabelInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTLabel>
}

/** SDL: updateLabel(id: Int!, input: UpdateLabelInput!): Label! */
export interface UpdateLabelResolver {
  (
    args: { id: number; input: UpdateLabelInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTLabel>
}

/** SDL: deleteLabel(id: Int!): Label! */
export interface DeleteLabelResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTLabel>
}
