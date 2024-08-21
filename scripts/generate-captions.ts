import { artists } from 'api/src/services/artists/artists'
import { generateCaptions } from 'api/src/lib/utils'

// Ensure the export directories exist
import { ensureDirectoryExists } from 'api/src/lib/utils'
import { getPaths } from '@redwoodjs/project-config'
import path from 'path'

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
ensureDirectoryExists(path.join(getPaths().base, 'exports', 'captions'))
console.log('Export directories created or verified.')
