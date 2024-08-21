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
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {artists.map((artist) => {
        return (
          <li key={artist.id}>
            <Link
              className="text-lg hover:font-bold"
              to={routes.artist({ id: artist.id })}
            >
              {artist.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
