import { useState } from 'react'

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
  mutation UpdateTrainingSetCaptions($id: Int!) {
    updateTrainingSetCaptions(id: $id) {
      id
    }
  }
`

const DOWNLOAD_TRAINING_SET = gql`
  mutation DownloadTrainingSet($id: Int!) {
    downloadTrainingSet(id: $id) {
      url
      trainingSet {
        id
      }
    }
  }
`

const REMOVE_IMAGE_FROM_TRAINING_SET = gql`
  mutation RemoveImageFromTrainingSet(
    $input: RemoveImageFromTrainingSetInput!
  ) {
    removeImageFromTrainingSet(input: $input) {
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
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  const [updateTrainingSetCaptions] = useMutation(
    UPDATE_TRAINING_SET_CAPTIONS,
    {
      onCompleted: () => {
        toast.success('Captions updated successfully')
      },
      refetchQueries: [{ query: QUERY, variables: { id: trainingSet.id } }],
    }
  )

  const [downloadTrainingSet] = useMutation(DOWNLOAD_TRAINING_SET, {
    onCompleted: () => {
      toast.success('Training set download started')
    },
    onError: (error) => {
      toast.error(`Failed to download training set: ${error.message}`)
    },
  })

  const [removeImageFromTrainingSet] = useMutation(
    REMOVE_IMAGE_FROM_TRAINING_SET,
    {
      onCompleted: () => {
        toast.success('Image removed from training set')
      },
      onError: (error) => {
        toast.error(`Failed to remove image: ${error.message}`)
      },
      refetchQueries: [{ query: QUERY, variables: { id: trainingSet.id } }],
    }
  )

  const handleUpdateCaptions = () => {
    const loadingToast = toast.loading('Updating captions...')
    updateTrainingSetCaptions({
      variables: { id: trainingSet.id },
      onCompleted: () => {
        toast.dismiss(loadingToast)
        toast.success('Captions updated successfully')
        console.log('Mutation completed')
      },
      onError: (error) => {
        toast.dismiss(loadingToast)
        toast.error(`Failed to update captions: ${error.message}`)
      },
    })
  }

  const handleExportTrainingSet = (id: number) => {
    const loadingToast = toast.loading('Preparing export ...')
    downloadTrainingSet({
      variables: { id },
      onCompleted: (data) => {
        toast.dismiss(loadingToast)
        setDownloadLink(data.downloadTrainingSet.url)

        toast.success(`Training set exported!`)
      },
      onError: () => {
        toast.dismiss(loadingToast)
        toast.error('Failed to export training set')
      },
    })
  }

  const handleRemoveImage = ({ imageId }: { imageId: number }) => {
    const loadingToast = toast.loading('Removing image...')
    removeImageFromTrainingSet({
      variables: { input: { trainingSetId: trainingSet.id, imageId } },
      onCompleted: () => {
        toast.dismiss(loadingToast)
        toast.success('Image removed from training set')
      },
      onError: (error) => {
        toast.dismiss(loadingToast)
        toast.error(`Failed to remove image: ${error.message}`)
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
          <li
            key={t.image.id}
            className="flex h-full flex-col items-center space-y-2"
          >
            <img
              src={t.image.uri}
              alt={t.image.uri}
              className="w-full flex-grow object-cover"
            />
            <p>{t.caption}</p>
            <button
              className="mt-auto rounded-full bg-red-500 px-4 py-2 text-white"
              onClick={() => handleRemoveImage({ imageId: t.image.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="my-4 flex justify-center gap-4">
        <button
          className="rounded-full bg-blue-500 px-4 py-2 text-white"
          onClick={() => handleUpdateCaptions()}
        >
          Update Captions
        </button>
        {!downloadLink && (
          <button
            className="rounded-full bg-green-500 px-4 py-2 text-white"
            onClick={() => handleExportTrainingSet(trainingSet.id)}
          >
            Export Training Set
          </button>
        )}
        {downloadLink && (
          <a
            className="rounded-full bg-purple-500 px-4 py-2 text-white"
            href={`http://localhost:8910/training_sets/${downloadLink}`}
            download={`training_set_v${trainingSet.version}.zip`}
          >
            Download Training Set
          </a>
        )}
      </div>
    </div>
  )
}
