export const schema = gql`
  type TrainingSet {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    version: Int!
    description: String
    releases: [Release]!
  }

  type Query {
    trainingSets: [TrainingSet!]! @blocked
    trainingSet(id: Int!): TrainingSet @blocked
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
    createTrainingSet(input: CreateTrainingSetInput!): TrainingSet! @blocked
    updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet!
      @blocked
    deleteTrainingSet(id: Int!): TrainingSet! @blocked
  }
`
