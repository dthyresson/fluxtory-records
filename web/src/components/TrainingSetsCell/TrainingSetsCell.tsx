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
    <ul>
      {trainingSets.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}