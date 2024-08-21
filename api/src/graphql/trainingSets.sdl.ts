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
    latestTrainingSetVersion: Int! @blocked
  }

  input CreateTrainingSetInput {
    version: Int!
    description: String
    releaseIds: [Int!]!
  }

  input UpdateTrainingSetInput {
    version: Int
    description: String
  }

  type Mutation {
    createTrainingSet(input: CreateTrainingSetInput!): TrainingSet!
    updateTrainingSet(id: Int!, input: UpdateTrainingSetInput!): TrainingSet!
      @blocked
    deleteTrainingSet(id: Int!): TrainingSet! @blocked
  }
`
