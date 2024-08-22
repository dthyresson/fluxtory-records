import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSet as RTTrainingSet } from './shared-return-types'
import type {
  RemoveImageFromTrainingSetInput,
  Mutation,
} from './shared-schema-types'

/** SDL: removeImageFromTrainingSet(input: RemoveImageFromTrainingSetInput!): TrainingSet! */
export interface RemoveImageFromTrainingSetResolver {
  (
    args: { input: RemoveImageFromTrainingSetInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}
