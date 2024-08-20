export const schema = gql`
  type Style {
    id: Int!
    name: String!
    releases: [Release]!
  }

  type Query {
    styles: [Style!]! @blocked
    style(id: Int!): Style @blocked
  }

  input CreateStyleInput {
    name: String!
  }

  input UpdateStyleInput {
    name: String
  }

  type Mutation {
    createStyle(input: CreateStyleInput!): Style! @blocked
    updateStyle(id: Int!, input: UpdateStyleInput!): Style! @blocked
    deleteStyle(id: Int!): Style! @blocked
  }
`
