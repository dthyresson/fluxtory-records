import fs from 'fs'
import path from 'path'

import { db } from 'api/src/lib/db'
import { artists } from 'api/src/services/artists/artists'
import { getReleasesWithPrimaryImagesByArtist } from 'api/src/services/releases/releases'

import { getPaths } from '@redwoodjs/project-config'

const EXPORTS_DIR = path.join(getPaths().base, 'exports')
const IMAGES_DIR = path.join(EXPORTS_DIR, 'images')
const CAPTIONS_DIR = path.join(EXPORTS_DIR, 'captions')

const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .slice(0, 100)
}

const generateCaptions = async (artistName: string): Promise<void> => {
  const artist = await db.artist.findUnique({ where: { name: artistName } })
  if (!artist) {
    console.error(`Artist "${artistName}" not found`)
    return
  }

  const releases = await getReleasesWithPrimaryImagesByArtist(artist.id)
  console.log(
    `Found ${releases.length} releases for artist: ${artistName} (${artist.id})`
  )
  if (releases.length === 0) {
    console.error(`No releases found for artist: ${artistName}`)
    return
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const captionsFilename = `${sanitizeFilename(
    artistName
  )}_captions_${timestamp}.jsonl`
  const captionsFilepath = path.join(CAPTIONS_DIR, captionsFilename)

  const captions = releases
    .map((release) => {
      const filename = sanitizeFilename(
        `${release.discogsId}_${release.artist?.name || artistName}_${
          release.title
        }_${release.format || 'unknown format'}`
      )

      const imageFilename = `${filename}.jpg`

      // check if the image exists
      const imageExists = fs.existsSync(path.join(IMAGES_DIR, imageFilename))

      if (!imageExists) {
        console.error(`Image "${imageFilename}" not found`)
        return null // Return null instead of undefined
      }

      const cover = release.genre?.name
        ? `${release.genre?.name} style cover`.trim()
        : 'cover'
      const album = release.style?.name
        ? `${release.style?.name} album`.trim()
        : 'album'
      const caption = `In the style of Factory Records album artwork, a ${release.format} ${cover} for the ${album} "${release.title}" by ${artistName} from ${release.year}`
      return JSON.stringify({ file_name: imageFilename, text: caption })
    })
    .filter(Boolean) // Remove null entries

  if (captions.length > 0) {
    fs.writeFileSync(captionsFilepath, captions.join('\n'))
    console.log(`Generated captions file: ${captionsFilepath}`)
  } else {
    console.log(`No captions generated for artist: ${artistName}`)
  }
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const { artist, all } = args

  if (artist) {
    console.log(`Generating captions for artist: ${artist}`)
    try {
      await generateCaptions(artist)
      console.log(`Successfully generated captions for artist: ${artist}`)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  if (all) {
    console.log(`Generating captions for all artists`)
    const allArtists = await artists()

    try {
      for (const artist of allArtists) {
        await generateCaptions(artist.name)
        console.log(
          `Successfully generated captions for artist: ${artist.name}`
        )
      }
      console.log('Successfully generated captions for all artists')
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}

// Ensure the export directories exist
fs.mkdirSync(EXPORTS_DIR, { recursive: true })
fs.mkdirSync(CAPTIONS_DIR, { recursive: true })
