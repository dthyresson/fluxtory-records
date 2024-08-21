import { useState } from 'react'

import type { FindReleaseQuery, FindReleaseQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

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
        type
        uri
      }
      artist {
        id
        name
      }
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

export const Success = ({
  release,
}: CellSuccessProps<FindReleaseQuery, FindReleaseQueryVariables>) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
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
          <div key={index} className="aspect-square">
            {!imageErrors[index] ? (
              <img
                src={image.uri}
                alt={`${release.title} - ${image.type}`}
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
