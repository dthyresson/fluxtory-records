import type {
  FindTrainingSetQuery,
  FindTrainingSetQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

const UPDATE_TRAINING_SET_CAPTIONS = gql`
  mutation UpdateTrainingSetCaptions($trainingSetId: Int!) {
    updateTrainingSetCaptions(trainingSetId: $trainingSetId) {
      id
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
  queryResult,
}: CellSuccessProps<FindTrainingSetQuery, FindTrainingSetQueryVariables>) => {
  const [updateTrainingSetCaptions] = useMutation(
    UPDATE_TRAINING_SET_CAPTIONS,
    {
      onCompleted: () => {
        queryResult.refetch()
        toast.success('Captions updated successfully')
      },
    }
  )

  const handleUpdateCaptions = () => {
    const loadingToast = toast.loading('Updating captions...')
    updateTrainingSetCaptions({
      variables: { trainingSetId: trainingSet.id },
      onCompleted: () => {
        toast.dismiss(loadingToast)
        toast.success('Captions updated successfully')
      },
      onError: (error) => {
        toast.dismiss(loadingToast)
        toast.error(`Failed to update captions: ${error.message}`)
      },
    })
  }

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
      <div className="my-4 flex justify-center">
        <button
          className="rounded-full bg-blue-500 px-4 py-2 text-white"
          onClick={() => handleUpdateCaptions()}
        >
          Update Captions
        </button>
      </div>
    </div>
  )
}
