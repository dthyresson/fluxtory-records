import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSetImage as RTTrainingSetImage } from './shared-return-types'
import type {
  CreateTrainingSetImageInput,
  UpdateTrainingSetImageInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: trainingSetImages: [TrainingSetImage!]! */
export interface TrainingSetImagesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetImage[]>
}

/** SDL: trainingSetImage(id: Int!): TrainingSetImage */
export interface TrainingSetImageResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetImage | null>
}

/** SDL: createTrainingSetImage(input: CreateTrainingSetImageInput!): TrainingSetImage! */
export interface CreateTrainingSetImageResolver {
  (
    args: { input: CreateTrainingSetImageInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetImage>
}

/** SDL: updateTrainingSetImage(id: Int!, input: UpdateTrainingSetImageInput!): TrainingSetImage! */
export interface UpdateTrainingSetImageResolver {
  (
    args: { id: number; input: UpdateTrainingSetImageInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetImage>
}

/** SDL: deleteTrainingSetImage(id: Int!): TrainingSetImage! */
export interface DeleteTrainingSetImageResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetImage>
}
