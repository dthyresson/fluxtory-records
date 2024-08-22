import type {
  FindTrainingSetQuery,
  FindTrainingSetQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindTrainingSetQuery,
  FindTrainingSetQueryVariables
> = gql`
  query FindTrainingSetQuery($id: Int!) {
    trainingSet: trainingSet(id: $id) {
      id
      version
      description
      imagesCount
      trainingSetImages {
        image {
          id
          uri
        }
        caption
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTrainingSetQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  trainingSet,
}: CellSuccessProps<FindTrainingSetQuery, FindTrainingSetQueryVariables>) => {
  return (
    <div>
      <h1>Version: {trainingSet.version}</h1>
      <p>Description: {trainingSet.description}</p>
      <p>Images: {trainingSet.imagesCount}</p>
      <ul className="grid grid-cols-3 gap-4">
        {trainingSet.trainingSetImages.map((t) => (
          <li key={t.image.id}>
            <img src={t.image.uri} alt={t.image.uri} />
            <p>{t.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
