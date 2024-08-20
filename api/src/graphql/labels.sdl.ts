export const schema = gql`
  type Label {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    discogsId: Int
    name: String!
    releases: [Release]!
  }

  type Query {
    labels: [Label!]! @blocked
    label(id: Int!): Label @blocked
  }

  input CreateLabelInput {
    discogsId: Int
    name: String!
  }

  input UpdateLabelInput {
    discogsId: Int
    name: String
  }

  type Mutation {
    createLabel(input: CreateLabelInput!): Label! @blocked
    updateLabel(id: Int!, input: UpdateLabelInput!): Label! @blocked
    deleteLabel(id: Int!): Label! @blocked
  }
`
