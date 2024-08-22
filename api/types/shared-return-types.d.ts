import type {
  Artist as PArtist,
  Genre as PGenre,
  Image as PImage,
  Label as PLabel,
  Release as PRelease,
  Style as PStyle,
  TrainingSet as PTrainingSet,
  TrainingSetImage as PTrainingSetImage,
} from '@prisma/client'

// You may very reasonably ask yourself, 'what is this file?' and why do I need it.

// Roughly, this file ensures that when a resolver wants to return a type - that
// type will match a prisma model. This is useful because you can trivially extend
// the type in the SDL and not have to worry about type mis-matches because the thing
// you returned does not include those functions.

// This gets particularly valuable when you want to return a union type, an interface,
// or a model where the prisma model is nested pretty deeply (GraphQL connections, for example.)
export interface AddImageToTrainingSetInput {
  __typename?: 'AddImageToTrainingSetInput'
  imageId: number
  newVersion?: boolean | null
  trainingSetId?: number | null
}

export interface CreateArtistInput {
  __typename?: 'CreateArtistInput'
  name: string
}

export interface CreateGenreInput {
  __typename?: 'CreateGenreInput'
  name: string
}

export interface CreateImageInput {
  __typename?: 'CreateImageInput'
  height: number
  releaseId: number
  resourceUrl: string
  type: string
  uri: string
  uri150: string
  width: number
}

export interface CreateLabelInput {
  __typename?: 'CreateLabelInput'
  discogsId?: number | null
  name: string
}

export interface CreateReleaseInput {
  __typename?: 'CreateReleaseInput'
  artistId?: number | null
  catalogNumber?: string | null
  discogsId: number
  format?: string | null
  genreId?: number | null
  labelId?: number | null
  notes?: string | null
  resourceUrl?: string | null
  status?: string | null
  styleId?: number | null
  thumbnail?: string | null
  title: string
  uri?: string | null
  year: number
}

export interface CreateStyleInput {
  __typename?: 'CreateStyleInput'
  name: string
}

export interface CreateTrainingSetImageInput {
  __typename?: 'CreateTrainingSetImageInput'
  caption?: string | null
  imageId: number
  trainingSetId: number
}

export interface CreateTrainingSetInput {
  __typename?: 'CreateTrainingSetInput'
  description?: string | null
  version: number
}

export interface Mutation {
  __typename?: 'Mutation'
  addImageToTrainingSet: PTrainingSet
  createArtist: PArtist
  createGenre: PGenre
  createImage: PImage
  createLabel: PLabel
  createRelease: PRelease
  createStyle: PStyle
  createTrainingSet: PTrainingSet
  createTrainingSetImage: PTrainingSetImage
  deleteArtist: PArtist
  deleteGenre: PGenre
  deleteImage: PImage
  deleteLabel: PLabel
  deleteRelease: PRelease
  deleteStyle: PStyle
  deleteTrainingSet: PTrainingSet
  deleteTrainingSetImage: PTrainingSetImage
  updateArtist: PArtist
  updateGenre: PGenre
  updateImage: PImage
  updateLabel: PLabel
  updateRelease: PRelease
  updateStyle: PStyle
  updateTrainingSet: PTrainingSet
  updateTrainingSetImage: PTrainingSetImage
}

export interface Query {
  __typename?: 'Query'
  artist?: PArtist | null
  artists: PArtist[]
  currentTrainingSet?: PTrainingSet | null
  genre?: PGenre | null
  genres: PGenre[]
  image?: PImage | null
  images: PImage[]
  label?: PLabel | null
  labels: PLabel[]
  redwood?: Redwood | null
  release?: PRelease | null
  releases: PRelease[]
  style?: PStyle | null
  styles: PStyle[]
  trainingSet?: PTrainingSet | null
  trainingSetImage?: PTrainingSetImage | null
  trainingSetImages: PTrainingSetImage[]
  trainingSets: PTrainingSet[]
}

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
}

export interface UpdateArtistInput {
  __typename?: 'UpdateArtistInput'
  name?: string | null
}

export interface UpdateGenreInput {
  __typename?: 'UpdateGenreInput'
  name?: string | null
}

export interface UpdateImageInput {
  __typename?: 'UpdateImageInput'
  height?: number | null
  releaseId?: number | null
  resourceUrl?: string | null
  type?: string | null
  uri?: string | null
  uri150?: string | null
  width?: number | null
}

export interface UpdateLabelInput {
  __typename?: 'UpdateLabelInput'
  discogsId?: number | null
  name?: string | null
}

export interface UpdateReleaseInput {
  __typename?: 'UpdateReleaseInput'
  artistId?: number | null
  catalogNumber?: string | null
  discogsId?: number | null
  format?: string | null
  genreId?: number | null
  labelId?: number | null
  notes?: string | null
  resourceUrl?: string | null
  status?: string | null
  styleId?: number | null
  thumbnail?: string | null
  title?: string | null
  uri?: string | null
  year?: number | null
}

export interface UpdateStyleInput {
  __typename?: 'UpdateStyleInput'
  name?: string | null
}

export interface UpdateTrainingSetImageInput {
  __typename?: 'UpdateTrainingSetImageInput'
  caption?: string | null
  imageId?: number | null
  trainingSetId?: number | null
}

export interface UpdateTrainingSetInput {
  __typename?: 'UpdateTrainingSetInput'
  description?: string | null
  version?: number | null
}

type JSON = any
export type Artist = PArtist
export type Genre = PGenre
export type Image = PImage
export type Label = PLabel
export type Release = PRelease
export type Style = PStyle
export type TrainingSet = PTrainingSet
export type TrainingSetImage = PTrainingSetImage
