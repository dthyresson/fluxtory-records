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
    labels: [Label!]! @requireAuth
    label(id: Int!): Label @requireAuth
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
    createLabel(input: CreateLabelInput!): Label! @requireAuth
    updateLabel(id: Int!, input: UpdateLabelInput!): Label! @requireAuth
    deleteLabel(id: Int!): Label! @requireAuth
  }
`
