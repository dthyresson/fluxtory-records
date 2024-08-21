import { Metadata } from '@redwoodjs/web'

import ArtistsCell from 'src/components/ArtistsCell'

const ArtistsPage = () => {
  return (
    <>
      <Metadata title="Artists" description="Artists page" />

      <h1 className="text-2xl font-bold">Artists</h1>

      <ArtistsCell />
    </>
  )
}

export default ArtistsPage
