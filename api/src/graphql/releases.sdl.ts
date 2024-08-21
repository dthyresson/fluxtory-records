export const schema = gql`
  type Release {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    discogsId: Int!
    status: String
    format: String
    catalogNumber: String
    thumbnail: String
    resourceUrl: String
    uri: String
    title: String!
    year: Int!
    notes: String
    labelId: Int
    label: Label
    artistId: Int
    artist: Artist
    images: [Image]!
    genre: Genre
    genreId: Int
    style: Style
    styleId: Int
  }

  type Query {
    releases: [Release!]! @blocked
    release(id: Int!): Release @skipAuth
  }

  input CreateReleaseInput {
    discogsId: Int!
    status: String
    format: String
    catalogNumber: String
    thumbnail: String
    resourceUrl: String
    uri: String
    title: String!
    year: Int!
    notes: String
    labelId: Int
    artistId: Int
    genreId: Int
    styleId: Int
  }

  input UpdateReleaseInput {
    discogsId: Int
    status: String
    format: String
    catalogNumber: String
    thumbnail: String
    resourceUrl: String
    uri: String
    title: String
    year: Int
    notes: String
    labelId: Int
    artistId: Int
    genreId: Int
    styleId: Int
  }

  type Mutation {
    createRelease(input: CreateReleaseInput!): Release! @blocked
    updateRelease(id: Int!, input: UpdateReleaseInput!): Release! @blocked
    deleteRelease(id: Int!): Release! @blocked
  }
`
