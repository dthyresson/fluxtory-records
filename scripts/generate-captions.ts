import fs from 'fs'
import path from 'path'

import { db } from 'api/src/lib/db'
import { getReleasesWithPrimaryImagesByArtist } from 'api/src/services/releases/releases'

import { getPaths } from '@redwoodjs/project-config'

const EXPORTS_DIR = path.join(getPaths().base, 'exports')
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
  const captionsFilename = `${sanitizeFilename(artistName)}_captions_${timestamp}.jsonl`
  const captionsFilepath = path.join(CAPTIONS_DIR, captionsFilename)

  const captions = releases.map((release) => {
    const filename = sanitizeFilename(
      `${release.discogsId}_${release.artist?.name || artistName}_${
        release.title
      }_${release.format || 'unknown format'}`
    )
    const caption = `In the style of [trigger], a record cover for "${release.title}" by ${artistName}`
    return JSON.stringify({ file_name: `${filename}.jpg`, text: caption })
  })

  fs.writeFileSync(captionsFilepath, captions.join('\n'))
  console.log(`Generated captions file: ${captionsFilepath}`)
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  let artistName = 'New Order'

  if (args.artist) {
    artistName = args.artist
  }

  console.log(`Generating captions for artist: ${artistName}`)

  try {
    await generateCaptions(artistName)
    console.log('Script completed successfully')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Ensure the export directories exist
fs.mkdirSync(EXPORTS_DIR, { recursive: true })
fs.mkdirSync(CAPTIONS_DIR, { recursive: true })
