export interface AddImageToTrainingSetInput {
  __typename?: 'AddImageToTrainingSetInput'
  imageId: number
  newVersion?: boolean | null
  trainingSetId?: number | null
}

export interface Artist {
  __typename?: 'Artist'
  createdAt: DateTime
  id: number
  name: string
  releases: Array<Release>
  updatedAt: DateTime
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

export interface Genre {
  __typename?: 'Genre'
  id: number
  name: string
  releases: Array<Release>
}

export interface Image {
  __typename?: 'Image'
  createdAt: DateTime
  height: number
  id: number
  release: Release
  releaseId: number
  resourceUrl: string
  type: string
  updatedAt: DateTime
  uri: string
  uri150: string
  width: number
}

export interface Label {
  __typename?: 'Label'
  createdAt: DateTime
  discogsId?: number | null
  id: number
  name: string
  releases: Array<Release>
  updatedAt: DateTime
}

export interface Mutation {
  __typename?: 'Mutation'
  addImageToTrainingSet: TrainingSet
  createArtist: Artist
  createGenre: Genre
  createImage: Image
  createLabel: Label
  createRelease: Release
  createStyle: Style
  createTrainingSet: TrainingSet
  createTrainingSetImage: TrainingSetImage
  deleteArtist: Artist
  deleteGenre: Genre
  deleteImage: Image
  deleteLabel: Label
  deleteRelease: Release
  deleteStyle: Style
  deleteTrainingSet: TrainingSet
  deleteTrainingSetImage: TrainingSetImage
  updateArtist: Artist
  updateGenre: Genre
  updateImage: Image
  updateLabel: Label
  updateRelease: Release
  updateStyle: Style
  updateTrainingSet: TrainingSet
  updateTrainingSetImage: TrainingSetImage
}

export interface Query {
  __typename?: 'Query'
  artist?: Artist | null
  artists: Artist[]
  currentTrainingSet?: TrainingSet | null
  genre?: Genre | null
  genres: Genre[]
  image?: Image | null
  images: Image[]
  label?: Label | null
  labels: Label[]
  redwood?: Redwood | null
  release?: Release | null
  releases: Release[]
  style?: Style | null
  styles: Style[]
  trainingSet?: TrainingSet | null
  trainingSetImage?: TrainingSetImage | null
  trainingSetImages: TrainingSetImage[]
  trainingSets: TrainingSet[]
}

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
}

export interface Release {
  __typename?: 'Release'
  artist?: Artist | null
  artistId?: number | null
  catalogNumber?: string | null
  createdAt: DateTime
  discogsId: number
  format?: string | null
  genre?: Genre | null
  genreId?: number | null
  id: number
  images: Array<Image>
  label?: Label | null
  labelId?: number | null
  notes?: string | null
  resourceUrl?: string | null
  status?: string | null
  style?: Style | null
  styleId?: number | null
  thumbnail?: string | null
  title: string
  updatedAt: DateTime
  uri?: string | null
  year: number
}

export interface Style {
  __typename?: 'Style'
  id: number
  name: string
  releases: Array<Release>
}

export interface TrainingSet {
  __typename?: 'TrainingSet'
  createdAt: DateTime
  description?: string | null
  id: number
  imagesCount: number
  trainingSetImages: Array<TrainingSetImage>
  updatedAt: DateTime
  version: number
}

export interface TrainingSetImage {
  __typename?: 'TrainingSetImage'
  caption?: string | null
  createdAt: DateTime
  id: number
  image: Image
  imageId: number
  trainingSet: TrainingSet
  trainingSetId: number
  updatedAt: DateTime
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

type DateTime = any
type JSON = any
