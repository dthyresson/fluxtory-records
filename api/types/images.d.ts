import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Image as RTImage } from './shared-return-types'
import type {
  CreateImageInput,
  UpdateImageInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: images: [Image!]! */
export interface ImagesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTImage[]>
}

/** SDL: image(id: Int!): Image */
export interface ImageResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTImage | null>
}

/** SDL: createImage(input: CreateImageInput!): Image! */
export interface CreateImageResolver {
  (
    args: { input: CreateImageInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTImage>
}

/** SDL: updateImage(id: Int!, input: UpdateImageInput!): Image! */
export interface UpdateImageResolver {
  (
    args: { id: number; input: UpdateImageInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTImage>
}

/** SDL: deleteImage(id: Int!): Image! */
export interface DeleteImageResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTImage>
}
