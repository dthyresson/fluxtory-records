import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { TrainingSet as RTTrainingSet } from './shared-return-types'
import type { Query } from './shared-schema-types'

/** SDL: currentTrainingSet: TrainingSet */
export interface CurrentTrainingSetResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTTrainingSet | null>
}
