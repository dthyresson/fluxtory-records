export const schema = gql`
  input AddImageToTrainingSetInput {
    imageId: Int!
    trainingSetId: Int
    newVersion: Boolean
  }

  type Query {
    currentTrainingSet: TrainingSet @skipAuth
  }

  type Mutation {
    createTrainingSet(input: CreateTrainingSetInput!): TrainingSet! @blocked
    updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet!
      @blocked
    deleteTrainingSet(id: Int!): TrainingSet! @blocked
    addImageToTrainingSet(input: AddImageToTrainingSetInput!): TrainingSet!
      @skipAuth
  }
`
