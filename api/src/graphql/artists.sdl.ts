export const schema = gql`
  type Artist {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    release: [Release]!
  }

  type Query {
    artists: [Artist!]! @requireAuth
    artist(id: Int!): Artist @requireAuth
  }

  input CreateArtistInput {
    name: String!
  }

  input UpdateArtistInput {
    name: String
  }

  type Mutation {
    createArtist(input: CreateArtistInput!): Artist! @requireAuth
    updateArtist(id: Int!, input: UpdateArtistInput!): Artist! @requireAuth
    deleteArtist(id: Int!): Artist! @requireAuth
  }
`
