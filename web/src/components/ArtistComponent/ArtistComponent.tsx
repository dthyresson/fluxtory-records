import React from 'react'

import ReleaseOverviewComponent from 'src/components/ReleaseOverviewComponent/ReleaseOverviewComponent'

interface ArtistProps {
  artist: {
    id: number
    name: string
    releases: Array<{
      id: number
      title: string
      format?: string
      images: Array<{
        type: string
        uri: string
      }>
    }>
  }
}

const ArtistComponent: React.FC<ArtistProps> = ({ artist }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{artist.name}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artist.releases.map((release) => (
          <ReleaseOverviewComponent key={release.id} release={release} />
        ))}
      </div>
    </div>
  )
}

export default ArtistComponent
