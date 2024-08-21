import fs from 'fs'
import path from 'path'

import { db } from 'api/src/lib/db'
import { discogs, getLabelByName, LABELS } from 'api/src/lib/discogs'
import {
  sanitizeFilename,
  ensureDirectoryExists,
  sleep,
} from 'api/src/lib/utils'
import { getReleasesWithPrimaryImagesByArtist } from 'api/src/services/releases/releases'

import { getPaths } from '@redwoodjs/project-config'

const EXPORTS_DIR = path.join(getPaths().base, 'exports', 'releases')

const fetchLabelReleases = async (labelName: string): Promise<void> => {
  const label = getLabelByName(labelName)
  if (!label) {
    console.error(`Label "${labelName}" not found`)
    return
  }

  console.log(`Fetching releases for label: ${labelName} (ID: ${label.id})`)

  try {
    const labelInfo = await discogs.getLabel(label.id)
    const releases = await discogs.getLabelReleases(label.id)

    const labelDir = path.join(EXPORTS_DIR, sanitizeFilename(labelName))
    ensureDirectoryExists(labelDir)

    // Save label info
    const labelInfoPath = path.join(labelDir, 'label_info.json')
    await fs.promises.writeFile(
      labelInfoPath,
      JSON.stringify(labelInfo, null, 2)
    )

    // Save releases
    const releasesPath = path.join(labelDir, 'releases.json')
    fs.writeFileSync(releasesPath, JSON.stringify(releases, null, 2))

    console.log(`Saved label info and releases for "${labelName}"`)

    // Fetch artist releases
    for (const release of releases.releases) {
      const artistName = release.artist
      const artist = await db.artist.findUnique({ where: { name: artistName } })
      if (artist) {
        const artistReleases = await getReleasesWithPrimaryImagesByArtist(
          artist.id
        )
        const artistReleasesPath = path.join(
          labelDir,
          `${sanitizeFilename(artistName)}_releases.json`
        )
        await fs.promises.writeFile(
          artistReleasesPath,
          JSON.stringify(artistReleases, null, 2)
        )
        console.log(`Saved releases for artist "${artistName}"`)
      } else {
        console.warn(`Artist "${artistName}" not found in the database`)
      }

      // Pause to avoid rate limiting
      await sleep(1000)
    }
  } catch (error) {
    console.error(`Error fetching releases for label "${labelName}":`, error)
  }
}

const fetchAllLabelsReleases = async (): Promise<void> => {
  for (const label of LABELS) {
    await fetchLabelReleases(label.name)
    // Pause between labels to avoid rate limiting
    await sleep(5000)
  }
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const { label, all } = args

  ensureDirectoryExists(EXPORTS_DIR)

  try {
    if (all) {
      console.log('Fetching releases for all labels')
      await fetchAllLabelsReleases()
    } else if (label) {
      console.log(`Fetching releases for label: ${label}`)
      await fetchLabelReleases(label)
    } else {
      console.error('Please specify either --label <label_name> or --all')
      process.exit(1)
    }

    console.log('Script completed successfully')
  } catch (error) {
    console.error('An error occurred:', error)
    process.exit(1)
  }
}
