import type {
  TrainingSetsQuery,
  TrainingSetsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  TrainingSetsQuery,
  TrainingSetsQueryVariables
> = gql`
  query TrainingSetsQuery {
    trainingSets {
      id
      version
      description
      imagesCount
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  trainingSets,
}: CellSuccessProps<TrainingSetsQuery>) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trainingSets.map((item) => {
        return (
          <li key={item.id} className="flex flex-col rounded-lg border p-4">
            <p>Version: {item.version}</p>
            <p>Description: {item.description}</p>
            <p>Images: {item.imagesCount}</p>
          </li>
        )
      })}
    </ul>
  )
}
