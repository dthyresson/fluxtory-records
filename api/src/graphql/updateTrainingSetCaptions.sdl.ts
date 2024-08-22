export const schema = gql`
  type Mutation {
    updateTrainingSetCaptions(id: Int!): TrainingSet! @requireAuth
  }
`
