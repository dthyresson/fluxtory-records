import React, { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
interface ReleaseProps {
  release: {
    id: number
    title: string
    format?: string
    images: Array<{
      type: string
      uri: string
    }>
  }
}

interface ReleaseOverviewComponentProps {
  release: ReleaseProps['release']
  className?: string
}

const ReleaseOverviewComponent: React.FC<ReleaseOverviewComponentProps> = ({
  release,
}) => {
  const [imageError, setImageError] = useState(false)
  const coverImage =
    release.images.find((image) => image.type === 'primary') ||
    release.images[0]

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Link to={routes.release({ id: release.id })} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
        {coverImage && !imageError ? (
          <img
            src={coverImage.uri}
            alt={release.title}
            className="h-48 w-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}

        <div className="flex flex-grow flex-col justify-between p-4">
          <h2 className="mb-2 text-xl font-semibold">{release.title}</h2>
          <p className="text-sm text-gray-500">{release.format}</p>
        </div>
      </div>
    </Link>
  )
}

export default ReleaseOverviewComponent
