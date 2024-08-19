export const schema = gql`
  type Style {
    id: Int!
    name: String!
    releases: [Release]!
  }

  type Query {
    styles: [Style!]! @requireAuth
    style(id: Int!): Style @requireAuth
  }

  input CreateStyleInput {
    name: String!
  }

  input UpdateStyleInput {
    name: String
  }

  type Mutation {
    createStyle(input: CreateStyleInput!): Style! @requireAuth
    updateStyle(id: Int!, input: UpdateStyleInput!): Style! @requireAuth
    deleteStyle(id: Int!): Style! @requireAuth
  }
`
