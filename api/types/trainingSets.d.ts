import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSet as RTTrainingSet } from './shared-return-types'
import type {
  CreateTrainingSetInput,
  UpdateTrainingSetInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: trainingSets: [TrainingSet!]! */
export interface TrainingSetsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet[]>
}

/** SDL: trainingSet(id: Int!): TrainingSet */
export interface TrainingSetResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet | null>
}

/** SDL: createTrainingSet(input: CreateTrainingSetInput!): TrainingSet! */
export interface CreateTrainingSetResolver {
  (
    args: { input: CreateTrainingSetInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}

/** SDL: updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet! */
export interface UpdateTrainingSetResolver {
  (
    args: { id: number; input: UpdateTrainingSetInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}

/** SDL: deleteTrainingSet(id: Int!): TrainingSet! */
export interface DeleteTrainingSetResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}
