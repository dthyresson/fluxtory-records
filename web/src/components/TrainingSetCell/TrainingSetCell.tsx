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
  const [downloadLink, setDownloadLink] = useState<string | null>(null)

  const [updateTrainingSetCaptions] = useMutation(
    UPDATE_TRAINING_SET_CAPTIONS,
    {
      onCompleted: () => {
        queryResult.refetch()
        toast.success('Captions updated successfully')
      },
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

  const handleUpdateCaptions = () => {
    const loadingToast = toast.loading('Updating captions...')
    updateTrainingSetCaptions({
      variables: { id: trainingSet.id },
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
            href={downloadLink}
            download={`training_set_v${trainingSet.version}.zip`}
          >
            Download Training Set
          </a>
        )}
      </div>
    </div>
  )
}
