import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSetDownload as RTTrainingSetDownload } from './shared-return-types'
import type { Mutation } from './shared-schema-types'

/** SDL: downloadTrainingSet(id: Int!): TrainingSetDownload! */
export interface DownloadTrainingSetResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSetDownload>
}
