import type { ArtistsQuery, ArtistsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  ArtistsQuery,
  ArtistsQueryVariables
> = gql`
  query ArtistsQuery {
    artists {
      id
      name
      releases {
        thumbnail
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ artists }: CellSuccessProps<ArtistsQuery>) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {artists.map((artist) => {
        return (
          <li key={artist.id} className="flex">
            <Link
              className="flex-grow items-center text-lg hover:font-bold"
              to={routes.artist({ id: artist.id })}
            >
              <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg p-4 shadow-md">
                <img
                  src={artist.releases[0]?.thumbnail}
                  alt={artist.name}
                  className="h-24 w-24 object-cover"
                  loading="lazy"
                />
                <div className="mt-2 text-center">{artist.name}</div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
