import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSet as RTTrainingSet } from './shared-return-types'
import type {
  AddImageToTrainingSetInput,
  Mutation,
} from './shared-schema-types'

/** SDL: addImageToTrainingSet(input: AddImageToTrainingSetInput!): TrainingSet! */
export interface AddImageToTrainingSetResolver {
  (
    args: { input: AddImageToTrainingSetInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}
