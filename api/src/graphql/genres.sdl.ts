export const schema = gql`
  type Genre {
    id: Int!
    name: String!
    releases: [Release]!
  }

  type Query {
    genres: [Genre!]! @blocked
    genre(id: Int!): Genre @blocked
  }

  input CreateGenreInput {
    name: String!
  }

  input UpdateGenreInput {
    name: String
  }

  type Mutation {
    createGenre(input: CreateGenreInput!): Genre! @blocked
    updateGenre(id: Int!, input: UpdateGenreInput!): Genre! @blocked
    deleteGenre(id: Int!): Genre! @blocked
  }
`
