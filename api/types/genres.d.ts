import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Genre as RTGenre } from './shared-return-types'
import type {
  CreateGenreInput,
  UpdateGenreInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: genres: [Genre!]! */
export interface GenresResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTGenre[]>
}

/** SDL: genre(id: Int!): Genre */
export interface GenreResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTGenre | null>
}

/** SDL: createGenre(input: CreateGenreInput!): Genre! */
export interface CreateGenreResolver {
  (
    args: { input: CreateGenreInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTGenre>
}

/** SDL: updateGenre(id: Int!, input: UpdateGenreInput!): Genre! */
export interface UpdateGenreResolver {
  (
    args: { id: number; input: UpdateGenreInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTGenre>
}

/** SDL: deleteGenre(id: Int!): Genre! */
export interface DeleteGenreResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTGenre>
}
