import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const TrainingSetsPage = () => {
  return (
    <>
      <Metadata title="TrainingSets" description="TrainingSets page" />

      <h1>TrainingSetsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/TrainingSetsPage/TrainingSetsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>trainingSets</code>, link to me with `
        <Link to={routes.trainingSets()}>TrainingSets</Link>`
      </p>
    </>
  )
}

export default TrainingSetsPage
