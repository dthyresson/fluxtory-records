import { Metadata } from '@redwoodjs/web'

import TrainingSetCell from 'src/components/TrainingSetCell'

type TrainingSetPageProps = {
  id: number
}

const TrainingSetPage = ({ id }: TrainingSetPageProps) => {
  return (
    <>
      <Metadata title="TrainingSet" description="TrainingSet page" />

      <h1>Training Set</h1>
      <TrainingSetCell id={id} />
    </>
  )
}

export default TrainingSetPage
