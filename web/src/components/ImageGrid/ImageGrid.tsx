import React, { useState, useEffect, useRef } from 'react'

interface Image {
  id: number
  uri: string
  releaseId: number
}

interface ImageGridProps {
  images: Image[]
  onImageSelect: (image: Image) => void
  selectedImages: Image[]
}

const useLazyLoad = (ref: React.RefObject<HTMLImageElement>, src: string) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.unobserve(ref.current)
        }
      },
      { rootMargin: '100px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, src])

  return isLoaded
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageSelect,
  selectedImages,
}) => {
  const handleImageClick = (image: Image) => {
    onImageSelect(image)
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          onClick={handleImageClick}
          isSelected={selectedImages.some((i) => i.id === image.id)}
        />
      ))}
    </div>
  )
}

const ImageItem: React.FC<{
  image: Image
  onClick: (image: Image) => void
  isSelected: boolean
}> = ({ image, onClick, isSelected }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const isLoaded = useLazyLoad(imgRef, image.uri)

  return (
    <div
      className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      }`}
      onClick={() => onClick(image)}
    >
      {isLoaded && <img ref={imgRef} src={image.uri} alt="" className="h-full w-full object-cover" />}
      {isSelected && <div className="absolute inset-0 bg-indigo-500 bg-opacity-30" />}
    </div>
  )
}

export default ImageGrid
