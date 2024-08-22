import React, { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallback: React.ReactNode
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback,
}) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return imageError ? (
    <>{fallback}</>
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={handleImageError}
      className="object-fit w-full rounded-lg"
    />
  )
}

export default ImageWithFallback
