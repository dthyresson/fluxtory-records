import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import {
  getLabelById,
  getLabelReleases,
  FACTORY_RECORDS_ID,
} from 'api/src/lib/discogs'
import type { Release, GetLabelReleasesResponse } from 'api/src/lib/discogs'

interface LabelRelease extends Release {
  status: string
  catno: string
  thumb: string
}

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  const label = getLabelById(args.labelId || FACTORY_RECORDS_ID)

  console.log(JSON.stringify(label, null, 2))

  if (!label) {
    console.error('Label not found')
    return
  }

  let page = 1
  let pages = 1
  const per_page = 100
  let releases, pagination
  let totalReleasesCreated = 0 // Initialize counter

  do {
    ;({ releases, pagination } = await getLabelReleases(label.id, {
      per_page,
      page,
    })) as GetLabelReleasesResponse

    const { pages: totalPages, items } = pagination
    pages = totalPages

    if (Array.isArray(releases)) {
      for (const release of releases as unknown as LabelRelease[]) {
        const {
          id,
          status,
          format,
          catno,
          thumb,
          resource_url,
          title,
          year,
          artist,
        } = release

        if (year === 0) {
          continue
        }

        try {
          await db.release.create({
            data: {
              discogsId: id,
              status,
              title,
              year,
              format,
              catalogNumber: catno,
              thumbnail: thumb,
              resourceUrl: resource_url,
              artist: {
                connectOrCreate: {
                  where: { name: artist },
                  create: { name: artist },
                },
              },
              label: {
                connectOrCreate: {
                  where: { discogsId: label.id },
                  create: { discogsId: label.id, name: label.name },
                },
              },
            },
          })
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            if (error.message.includes('Unique constraint failed')) {
              console.warn('Release already exists. Skipping... ')
            } else {
              console.error(error)
            }
          }
        }
      }
    }
    totalReleasesCreated += releases.length // Update counter
    console.info(
      `Fetched and created ${releases.length}/${totalReleasesCreated} of ${items} releases`
    )

    // pause for a bit
    await new Promise((resolve) => setTimeout(resolve, 2_000))

    page++
  } while (page <= pages)

  // After the loop, you can log the total if needed
  console.info(`Total releases created: ${totalReleasesCreated}`)
}
