export const schema = gql`
  input RemoveImageFromTrainingSetInput {
    imageId: Int!
    trainingSetId: Int!
  }

  type Mutation {
    removeImageFromTrainingSet(
      input: RemoveImageFromTrainingSetInput!
    ): TrainingSet! @skipAuth
  }
`
