export const schema = gql`
  type Image {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: String!
    uri: String!
    resourceUrl: String!
    uri150: String!
    width: Int!
    height: Int!
    releaseId: Int!
    release: Release!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    type: String!
    uri: String!
    resourceUrl: String!
    uri150: String!
    width: Int!
    height: Int!
    releaseId: Int!
  }

  input UpdateImageInput {
    type: String
    uri: String
    resourceUrl: String
    uri150: String
    width: Int
    height: Int
    releaseId: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`
