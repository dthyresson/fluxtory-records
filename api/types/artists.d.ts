import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Artist as RTArtist } from './shared-return-types'
import type {
  CreateArtistInput,
  UpdateArtistInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: artists: [Artist!]! */
export interface ArtistsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTArtist[]>
}

/** SDL: artist(id: Int!): Artist */
export interface ArtistResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTArtist | null>
}

/** SDL: createArtist(input: CreateArtistInput!): Artist! */
export interface CreateArtistResolver {
  (
    args: { input: CreateArtistInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTArtist>
}

/** SDL: updateArtist(id: Int!, input: UpdateArtistInput!): Artist! */
export interface UpdateArtistResolver {
  (
    args: { id: number; input: UpdateArtistInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTArtist>
}

/** SDL: deleteArtist(id: Int!): Artist! */
export interface DeleteArtistResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTArtist>
}
