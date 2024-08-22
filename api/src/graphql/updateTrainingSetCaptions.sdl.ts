export const schema = gql`
  type Mutation {
    updateTrainingSetCaptions(trainingSetId: Int!): TrainingSet! @requireAuth
  }
`
