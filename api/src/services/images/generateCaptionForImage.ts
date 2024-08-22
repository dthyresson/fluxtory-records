import { db } from 'src/lib/db'
const TRIGGER = 'fktry-rcrd'

export const generateCaptionForImage = async (imageId: number) => {
  const image = await db.image.findUnique({
    where: { id: imageId },
    include: {
      release: {
        include: {
          artist: true,
          genre: true,
          style: true,
        },
      },
    },
  })

  const release = image?.release

  const characteristics = [
    image?.release?.genre?.name,
    image?.release?.style?.name,
    image?.release?.year,
  ]
    .filter(Boolean)
    .join(', ')

  const caption = `a ${TRIGGER} of the ${release?.format}, titled "${release?.title}", by the artist "${release?.artist?.name}", ${characteristics}`

  return caption
}
