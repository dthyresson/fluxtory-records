import type { FindArtistQuery, FindArtistQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ArtistComponent from 'src/components/ArtistComponent/ArtistComponent'

export const QUERY: TypedDocumentNode<
  FindArtistQuery,
  FindArtistQueryVariables
> = gql`
  query FindArtistQuery($id: Int!) {
    artist: artist(id: $id) {
      id
      name
      releases {
        id
        title
        format
        images {
          type
          uri
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArtistQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  artist,
}: CellSuccessProps<FindArtistQuery, FindArtistQueryVariables>) => {
  return <ArtistComponent artist={artist} />
}
