export const schema = gql`
  type TrainingSet {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    version: Int!
    description: String
    trainingSetImages: [TrainingSetImage]!
    imagesCount: Int!
  }

  type Query {
    trainingSets: [TrainingSet!]! @requireAuth
    trainingSet(id: Int!): TrainingSet @requireAuth
  }

  input CreateTrainingSetInput {
    version: Int!
    description: String
  }

  input UpdateTrainingSetInput {
    version: Int
    description: String
  }

  type Mutation {
    createTrainingSet(input: CreateTrainingSetInput!): TrainingSet! @requireAuth
    updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet!
      @requireAuth
    deleteTrainingSet(id: Int!): TrainingSet! @requireAuth
  }
`
