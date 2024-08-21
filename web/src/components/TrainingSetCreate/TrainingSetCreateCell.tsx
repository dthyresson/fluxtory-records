import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import TrainingSetCreateForm from './TrainingSetCreateForm'

export const QUERY = gql`
  query GetLatestTrainingSetVersion {
    latestTrainingSetVersion
  }
`

export const Loading = () => (
  <div className="text-center">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  </div>
)

export const Empty = () => (
  <div className="text-center text-gray-500">No training sets found. Creating the first one!</div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <div className="mt-2 text-sm text-red-700">
          {error.message}
        </div>
      </div>
    </div>
  </div>
)

interface LatestVersionQuery {
  latestTrainingSetVersion: number
}

export const Success = ({
  latestTrainingSetVersion,
}: CellSuccessProps<LatestVersionQuery>) => {
  return (
    <TrainingSetCreateForm latestVersion={latestTrainingSetVersion} />
  )
}
