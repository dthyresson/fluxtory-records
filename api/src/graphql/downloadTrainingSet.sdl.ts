export const schema = gql`
  type TrainingSetDownload {
    url: String!
    trainingSet: TrainingSet!
  }

  type Mutation {
    downloadTrainingSet(id: Int!): TrainingSetDownload! @requireAuth
  }
`
