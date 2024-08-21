import { RefObject, useEffect, useState } from 'react'

interface LazyLoadImageOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export const useLazyLoadImage = (
  ref: RefObject<HTMLImageElement>,
  src: string,
  options: LazyLoadImageOptions = {}
): boolean => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const { rootMargin = '200px', threshold = 0, once = true } = options

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { rootMargin, threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, src, options])

  return isLoaded
}

// Add more image-related utility functions here as needed
