export const schema = gql`
  type TrainingSet {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    version: Int!
    description: String
    images: [Image]!
  }

  type Query {
    trainingSets: [TrainingSet!]! @skipAuth
    trainingSet(id: Int!): TrainingSet @skipAuth
    currentTrainingSet: TrainingSet @skipAuth
  }

  input CreateTrainingSetInput {
    version: Int!
    description: String
  }

  input UpdateTrainingSetInput {
    version: Int
    description: String
  }

  input AddImageToTrainingSetInput {
    imageId: Int!
    trainingSetId: Int
    newVersion: Boolean
  }

  type Mutation {
    createTrainingSet(input: CreateTrainingSetInput!): TrainingSet! @blocked
    updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet!
      @blocked
    deleteTrainingSet(id: Int!): TrainingSet! @blocked
    addImageToTrainingSet(input: AddImageToTrainingSetInput!): TrainingSet!
      @blocked
  }
`
