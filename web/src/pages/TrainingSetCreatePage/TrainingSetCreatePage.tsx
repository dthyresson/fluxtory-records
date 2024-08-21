import { MetaTags } from '@redwoodjs/web'
import TrainingSetCreateCell from 'src/components/TrainingSetCreate/TrainingSetCreateCell'

const TrainingSetCreatePage = () => {
  return (
    <>
      <MetaTags title="Create Training Set" description="Create a new training set" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Create New Training Set
        </h1>
        <div className="max-w-3xl">
          <TrainingSetCreateCell />
        </div>
      </div>
    </>
  )
}

export default TrainingSetCreatePage
