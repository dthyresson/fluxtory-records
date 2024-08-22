export const schema = gql`
  type TrainingSetImage {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    caption: String
    trainingSetId: Int!
    trainingSet: TrainingSet!
    imageId: Int!
    image: Image!
  }

  type Query {
    trainingSetImages: [TrainingSetImage!]! @requireAuth
    trainingSetImage(id: Int!): TrainingSetImage @requireAuth
  }

  input CreateTrainingSetImageInput {
    caption: String
    trainingSetId: Int!
    imageId: Int!
  }

  input UpdateTrainingSetImageInput {
    caption: String
    trainingSetId: Int
    imageId: Int
  }

  type Mutation {
    createTrainingSetImage(
      input: CreateTrainingSetImageInput!
    ): TrainingSetImage! @requireAuth
    updateTrainingSetImage(
      id: Int!
      input: UpdateTrainingSetImageInput!
    ): TrainingSetImage! @requireAuth
    deleteTrainingSetImage(id: Int!): TrainingSetImage! @requireAuth
  }
`
