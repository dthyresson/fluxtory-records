import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Release as RTRelease } from './shared-return-types'
import type {
  CreateReleaseInput,
  UpdateReleaseInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: releases: [Release!]! */
export interface ReleasesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTRelease[]>
}

/** SDL: release(id: Int!): Release */
export interface ReleaseResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTRelease | null>
}

/** SDL: createRelease(input: CreateReleaseInput!): Release! */
export interface CreateReleaseResolver {
  (
    args: { input: CreateReleaseInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTRelease>
}

/** SDL: updateRelease(id: Int!, input: UpdateReleaseInput!): Release! */
export interface UpdateReleaseResolver {
  (
    args: { id: number; input: UpdateReleaseInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTRelease>
}

/** SDL: deleteRelease(id: Int!): Release! */
export interface DeleteReleaseResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTRelease>
}
