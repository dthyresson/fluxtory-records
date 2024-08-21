import fs from 'fs'
import path from 'path'

import { db } from 'api/src/lib/db'
import {
  sanitizeFilename,
  downloadImage,
  createZipArchive,
  ensureDirectoryExists,
  sleep,
} from 'api/src/lib/utils'
import { artists } from 'api/src/services/artists/artists'
import { getReleasesWithPrimaryImagesByArtist } from 'api/src/services/releases/releases'
// import type { Artist, Release, Image } from 'types/shared-return-types'

import { getPaths } from '@redwoodjs/project-config'

const EXPORTS_DIR = path.join(getPaths().base, 'exports', 'images')
const TRAINING_DIR = path.join(EXPORTS_DIR, 'training')

const fetchArtistImages = async (artistName: string): Promise<void> => {
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

  const imageDir = path.join(EXPORTS_DIR, sanitizeFilename(artistName))

  ensureDirectoryExists(imageDir)

  for (const release of releases) {
    if (release.images.length > 0) {
      const image = release.images[0]
      const uri = image.uri

      if (!uri) {
        console.warn(`No URI found for image: ${image}`)
        continue
      }
      const filename = sanitizeFilename(
        `${release.discogsId}_${release.artist?.name || artistName}_${
          release.title
        }_${release.format || 'unknown format'}`
      )
      console.log(`Downloading image for "${filename}"`)

      const fileExtension = path.extname(uri).toLowerCase() || '.jpg'
      const filepath = path.join(imageDir, `${filename}${fileExtension}`)

      try {
        // don't download the same image twice
        if (fs.existsSync(filepath)) {
          console.log(`Image already exists: ${filepath}`)
          continue
        }
        await downloadImage(uri, filepath)

        // pause for a random amount of time between .25 and 1.5 seconds
        await sleep(Math.floor(Math.random() * 1250) + 250)
        console.log(
          `Downloaded image for "${release.artist?.name || artistName} - ${
            release.title
          }"`
        )
      } catch (error) {
        console.error(
          `Failed to download image for "${
            release.artist?.name || artistName
          } - ${release.title}":`,
          error
        )
      }
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const zipFilename = `${sanitizeFilename(artistName)}_${timestamp}.zip`
  const zipFilepath = path.join(TRAINING_DIR, zipFilename)

  await createZipArchive(imageDir, zipFilepath)
  console.log(`Created zip archive: ${zipFilepath}`)
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const { artist, all } = args

  if (artist) {
    console.log(`Fetching images for artist: ${artist}`)

    try {
      await fetchArtistImages(artist)
      console.log('Successfully fetched images for artist', artist)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  if (all) {
    console.log(`Fetching images for all artists`)

    const allArtists = await artists()

    try {
      for (const artist of allArtists) {
        console.log(`Fetching images for artist: ${artist.name}`)
        await fetchArtistImages(artist.name)
        console.log(`Successfully fetched images for artist: ${artist.name}`)
      }
      console.log('Successfully fetched images for all artists')
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}

// Ensure the export directories exist
ensureDirectoryExists(EXPORTS_DIR)
ensureDirectoryExists(TRAINING_DIR)

console.log('Export directories created or verified.')
