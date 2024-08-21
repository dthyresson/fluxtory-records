const {
  DiscogsClient,
  PaginationParameters,
  GetLabelReleasesResponse,
  GetLabelResponse,
  GetReleaseResponse,
} = require('@lionralfs/discogs-client/commonjs')

export type {
  PaginationParameters,
  Label,
  Release,
  Artist,
  GetLabelReleasesResponse,
  GetLabelResponse,
  GetReleaseResponse,
} from '@lionralfs/discogs-client/commonjs'

export const FACTORY_RECORDS_ID = 857

export const LABELS = [
  {
    id: 857,
    name: 'Factory Records',
  },
]

export const getLabelById = (id: number) => {
  return LABELS.find((label) => label.id === id)
}

export const getLabelByName = (name: string) => {
  return LABELS.find((label) => label.name === name)
}

export const discogsClient = new DiscogsClient({
  userAgent: process.env.DISCOGS_USER_AGENT,
  auth: {
    userToken: process.env.DISCOGS_USER_TOKEN,
  },
})

discogsClient.setConfig({
  exponentialBackoffIntervalMs: 2_000,
  exponentialBackoffMaxRetries: 5,
  exponentialBackoffRate: 2.7,
  apiVersion: 'v2',
  outputFormat: 'discogs',
})

export const discogs = discogsClient.database()

export const getLabel = async (
  labelId: number | string,
  params?: typeof PaginationParameters
): Promise<typeof GetLabelResponse> => {
  const label = await discogs.getLabel(labelId, params)
  return label
}

export const getLabelReleases = async (
  labelId: number | string,
  params?: typeof PaginationParameters
): Promise<typeof GetLabelReleasesResponse> => {
  const response = await discogs.getLabelReleases(labelId, params)
  const { data } = response
  const { releases, pagination } = data
  return { releases, pagination }
}

export const getLabelArtists = async (
  labelId: number | string,
  params?: typeof PaginationParameters
): Promise<string[]> => {
  let page = 1
  const perPage = 100
  const allArtists = new Set<string>()

  while (true) {
    const { releases, pagination } = await getLabelReleases(labelId, {
      ...params,
      page,
      per_page: perPage,
    })

    releases.forEach((release) => allArtists.add(release.artist))

    if (page >= pagination.pages) {
      break
    }

    page++
  }

  return Array.from(allArtists)
}

export const getRelease = async (
  releaseId: number | string
): Promise<typeof GetReleaseResponse> => {
  const release = await discogs.getRelease(releaseId)
  return release.data
}
