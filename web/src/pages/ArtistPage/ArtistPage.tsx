import { Metadata } from '@redwoodjs/web'

import ArtistCell from 'src/components/ArtistCell'

const ArtistPage = ({ id }: { id: number }) => {
  return (
    <>
      <Metadata title="Artist" description="Artist page" />

      <ArtistCell id={id} />
    </>
  )
}

export default ArtistPage
