import { Metadata } from '@redwoodjs/web'

import TrainingSetsCell from 'src/components/TrainingSetsCell'

const TrainingSetsPage = () => {
  return (
    <>
      <Metadata title="TrainingSets" description="TrainingSets page" />

      <h1 className="text-2xl font-bold">Training Sets</h1>
      <TrainingSetsCell />
    </>
  )
}

export default TrainingSetsPage
