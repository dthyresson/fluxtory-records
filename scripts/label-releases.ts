import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import {
  getLabelById,
  getLabelReleases,
  FACTORY_RECORDS_ID,
} from 'api/src/lib/discogs'
import type { Label, Release } from 'api/src/lib/discogs'

interface LabelRelease extends Release {
  status: string
  catno: string
  thumb: string
}

type LabelInfo = Pick<Label, 'id' | 'name'>

const fetchLabel = (labelId: number): LabelInfo => {
  const label = getLabelById(labelId || FACTORY_RECORDS_ID)
  if (!label) {
    console.error('Label not found')
    return null
  }
  return label
}

const processReleases = async (releases: LabelRelease[], label: LabelInfo) => {
  for (const release of releases) {
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

const fetchAndCreateReleases = async (label: LabelInfo) => {
  let page = 1
  let pages = 1
  const per_page = 100
  let totalReleasesCreated = 0

  do {
    const { releases, pagination } = await getLabelReleases(label.id, {
      per_page,
      page,
    })

    const { pages: totalPages, items } = pagination
    pages = totalPages

    if (Array.isArray(releases)) {
      await processReleases(releases as unknown as LabelRelease[], label)
    }
    totalReleasesCreated += releases.length
    console.info(
      `Fetched and created ${releases.length}/${totalReleasesCreated} of ${items} releases`
    )

    await new Promise((resolve) => setTimeout(resolve, 2_000))
    page++
  } while (page <= pages)

  console.info(`Total releases created: ${totalReleasesCreated}`)
}

export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  console.log(args)

  const label = fetchLabel(args.labelId)
  if (!label) return

  await fetchAndCreateReleases(label)
}
