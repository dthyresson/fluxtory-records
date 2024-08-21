import path from 'path'

import {
  generateCaptions,
  processCaptionsFile,
  sanitizeFilename,
} from 'api/src/lib/utils'
import { ensureDirectoryExists } from 'api/src/lib/utils'
import { artists } from 'api/src/services/artists/artists'

// Ensure the export directories exist

import { getPaths } from '@redwoodjs/project-config'

const IMAGE_DIR = path.join(getPaths().base, 'exports', 'images')

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const { artist, all } = args

  if (artist) {
    console.log(`Generating captions for artist: ${artist}`)
    try {
      const captionsFilePath = await generateCaptions(artist)
      const imageDir = path.join(IMAGE_DIR, sanitizeFilename(artist))

      if (captionsFilePath) {
        await processCaptionsFile(captionsFilePath, imageDir)
        console.log(`Successfully generated captions for artist: ${artist}`)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  if (all) {
    console.log(`Generating captions for all artists`)
    const allArtists = await artists()

    try {
      for (const artist of allArtists) {
        const captionsFilePath = await generateCaptions(artist.name)
        const imageDir = path.join(IMAGE_DIR, sanitizeFilename(artist.name))

        if (captionsFilePath) {
          await processCaptionsFile(captionsFilePath, imageDir)
          console.log(
            `Successfully generated captions for artist: ${artist.name}`
          )
        }
      }
      console.log('Successfully generated captions for all artists')
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}

ensureDirectoryExists(path.join(getPaths().base, 'exports', 'captions'))
console.log('Export directories created or verified.')
