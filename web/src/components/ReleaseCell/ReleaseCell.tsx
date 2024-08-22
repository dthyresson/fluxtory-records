import { useState } from 'react'

import type { FindReleaseQuery, FindReleaseQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const QUERY: TypedDocumentNode<
  FindReleaseQuery,
  FindReleaseQueryVariables
> = gql`
  query FindReleaseQuery($id: Int!) {
    release: release(id: $id) {
      id
      title
      format
      notes
      style {
        id
        name
      }
      genre {
        id
        name
      }
      images {
        id
        type
        uri
      }
      artist {
        id
        name
      }
    }
    currentTrainingSet {
      id
      version
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindReleaseQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const ADD_IMAGE_TO_TRAINING_SET = gql`
  mutation AddImageToTrainingSet($input: AddImageToTrainingSetInput!) {
    addImageToTrainingSet(input: $input) {
      id
      version
    }
  }
`

export const Success = ({
  release,
  currentTrainingSet,
  queryResult,
}: CellSuccessProps<FindReleaseQuery, FindReleaseQueryVariables>) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [addImageToTrainingSet] = useMutation(ADD_IMAGE_TO_TRAINING_SET)

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const handleAddToTrainingSet = async ({
    imageId,
    trainingSetId,
    newVersion = false,
  }: {
    imageId: number
    trainingSetId?: number
    newVersion?: boolean
  }) => {
    try {
      const result = await addImageToTrainingSet({
        variables: {
          input: {
            imageId,
            trainingSetId,
            newVersion,
          },
        },
      })
      queryResult.refetch()
      toast.success(
        `Image added to training set version ${result.data.addImageToTrainingSet.version}`
      )
    } catch (error) {
      toast.error('Failed to add image to training set')
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-2 text-2xl font-bold">{release.title}</h1>
      <h2 className="mb-4 text-lg">
        <span className="font-semibold">Artist:</span>{' '}
        <Link to={routes.artist({ id: release.artist.id })}>
          {release.artist.name}
        </Link>
      </h2>
      <p className="mb-4">
        <span className="font-semibold">Format:</span> {release.format}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Style:</span> {release.style?.name}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Genre:</span> {release.genre?.name}
      </p>
      <p className="mb-4">{release.notes}</p>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-2">
        {release.images.map((image, index) => (
          <div
            key={index}
            className="bg-base-100 flex h-full flex-col rounded-lg p-4 shadow-xl"
          >
            <figure className="aspect-auto flex-grow">
              {!imageErrors[index] ? (
                <img
                  src={image.uri}
                  alt={`${release.title} - ${image.type}`}
                  className="object-fit w-full rounded-lg"
                  loading="lazy"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </figure>
            <div className="flex flex-col p-4">
              <h2 className="mb-2 text-xl font-semibold">{image.type}</h2>
              <div className="mt-auto flex justify-end space-x-2">
                {currentTrainingSet && (
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() =>
                      handleAddToTrainingSet({
                        imageId: image.id,
                        trainingSetId: currentTrainingSet.id,
                      })
                    }
                  >
                    Add to Current Set ({currentTrainingSet.version})
                  </button>
                )}
                <button
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                  onClick={() =>
                    handleAddToTrainingSet({
                      imageId: image.id,
                      newVersion: true,
                    })
                  }
                >
                  Add to New Set
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
