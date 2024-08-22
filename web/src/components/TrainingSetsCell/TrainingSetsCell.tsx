import type {
  TrainingSetsQuery,
  TrainingSetsQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
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
      trainingSetImages {
        image {
          id
          uri
        }
      }
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
            <Link to={routes.trainingSet({ id: item.id })}>
              <p>Version: {item.version}</p>
              <p>Description: {item.description}</p>
              <p>Images: {item.imagesCount}</p>
            </Link>
            <div className="mt-2 flex w-full flex-row gap-2 overflow-x-auto">
              {item.trainingSetImages.map((t) => (
                <img
                  key={t.image.id}
                  src={t.image.uri}
                  alt="Training set"
                  className="object-fit  h-16 flex-shrink-0"
                />
              ))}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
