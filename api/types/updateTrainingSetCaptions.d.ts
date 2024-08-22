import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSet as RTTrainingSet } from './shared-return-types'
import type { Mutation } from './shared-schema-types'

/** SDL: updateTrainingSetCaptions(id: Int!): TrainingSet! */
export interface UpdateTrainingSetCaptionsResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet>
}
