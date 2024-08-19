import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Style as RTStyle } from './shared-return-types'
import type {
  CreateStyleInput,
  UpdateStyleInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: styles: [Style!]! */
export interface StylesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTStyle[]>
}

/** SDL: style(id: Int!): Style */
export interface StyleResolver {
  (
    args: { id: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTStyle | null>
}

/** SDL: createStyle(input: CreateStyleInput!): Style! */
export interface CreateStyleResolver {
  (
    args: { input: CreateStyleInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTStyle>
}

/** SDL: updateStyle(id: Int!, input: UpdateStyleInput!): Style! */
export interface UpdateStyleResolver {
  (
    args: { id: number; input: UpdateStyleInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTStyle>
}

/** SDL: deleteStyle(id: Int!): Style! */
export interface DeleteStyleResolver {
  (
    args: { id: number },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTStyle>
}
