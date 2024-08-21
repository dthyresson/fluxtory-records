import { useState, useEffect } from 'react'
import { Form, TextField, Submit, FieldError, Label } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import ArtistSelect from 'src/components/ArtistSelect/ArtistSelect'
import ImageGridCell from 'src/components/ImageGrid/ImageGridCell'

const CREATE_TRAINING_SET = gql`
  mutation CreateTrainingSet($input: CreateTrainingSetInput!) {
    createTrainingSet(input: $input) {
      id
      version
      description
    }
  }
`

interface TrainingSetCreateFormProps {
  latestVersion: number
}

const TrainingSetCreateForm = ({ latestVersion }: TrainingSetCreateFormProps) => {
  const [description, setDescription] = useState('')
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])
  const [createTrainingSet, { loading, error }] = useMutation(CREATE_TRAINING_SET, {
    onCompleted: () => {
      toast.success('Training set created successfully')
      setDescription('')
      setSelectedArtist(null)
      setSelectedImages([])
    },
  })

  const onSubmit = async () => {
    if (selectedImages.length === 0) {
      toast.error('Please select at least one image')
      return
    }

    try {
      await createTrainingSet({
        variables: {
          input: {
            version: latestVersion + 1,
            description,
            releaseIds: selectedImages.map((image) => image.releaseId),
          },
        },
      })
    } catch (error) {
      toast.error('Error creating training set')
    }
  }

  const handleImageSelection = (image) => {
    setSelectedImages((prev) =>
      prev.some((i) => i.id === image.id)
        ? prev.filter((i) => i.id !== image.id)
        : [...prev, image]
    )
  }

  return (
    <Form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label name="version" className="block text-sm font-medium text-gray-700">
          Version
        </Label>
        <div className="mt-1">
          <TextField
            name="version"
            value={latestVersion + 1}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            readOnly
          />
        </div>
      </div>

      <div>
        <Label name="description" className="block text-sm font-medium text-gray-700">
          Description
        </Label>
        <div className="mt-1">
          <TextField
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <FieldError name="description" className="text-red-600" />
      </div>

      <div>
        <Label name="artist" className="block text-sm font-medium text-gray-700">
          Select Artist
        </Label>
        <div className="mt-1">
          <ArtistSelect onSelect={setSelectedArtist} />
        </div>
      </div>

      {selectedArtist && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Select Images</h3>
          <ImageGridCell
            artistId={selectedArtist.id}
            onImageSelect={handleImageSelection}
            selectedImages={selectedImages}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {selectedImages.length} image(s) selected
        </div>
        <Submit
          disabled={loading || selectedImages.length === 0}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Training Set'}
        </Submit>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </Form>
  )
}

export default TrainingSetCreateForm
