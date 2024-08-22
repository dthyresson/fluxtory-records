export const schema = gql`
  type Artist {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    releases: [Release]!
  }

  type Query {
    artists: [Artist!]! @skipAuth
    artist(id: Int!): Artist @skipAuth
  }

  input CreateArtistInput {
    name: String!
  }

  input UpdateArtistInput {
    name: String
  }

  type Mutation {
    createArtist(input: CreateArtistInput!): Artist! @blocked
    updateArtist(id: Int!, input: UpdateArtistInput!): Artist! @blocked
    deleteArtist(id: Int!): Artist! @blocked
  }
`
