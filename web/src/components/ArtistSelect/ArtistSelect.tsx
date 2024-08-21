import { useState, useCallback } from 'react'
import { useQuery } from '@redwoodjs/web'
import { TextField, Label } from '@redwoodjs/forms'
import { debounce } from 'lodash'

const SEARCH_ARTISTS = gql`
  query SearchArtists($searchTerm: String!) {
    searchArtists(searchTerm: $searchTerm) {
      id
      name
      releaseCount
    }
  }
`

interface Artist {
  id: number
  name: string
  releaseCount: number
}

interface ArtistSelectProps {
  onSelect: (artist: Artist) => void
}

const ArtistSelect = ({ onSelect }: ArtistSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const { loading, data } = useQuery(SEARCH_ARTISTS, {
    variables: { searchTerm },
    skip: searchTerm.length < 2,
  })

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
      setIsOpen(true)
    }, 300),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const handleSelectArtist = (artist: Artist) => {
    onSelect(artist)
    setIsOpen(false)
    setSearchTerm(artist.name)
  }

  return (
    <div className="relative">
      <Label name="artist" className="block text-sm font-medium text-gray-700">
        Search for an artist
      </Label>
      <TextField
        name="artist"
        placeholder="Start typing to search..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {loading && (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          )}
          {!loading && data?.searchArtists?.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No artists found</div>
          )}
          {!loading &&
            data?.searchArtists?.map((artist: Artist) => (
              <div
                key={artist.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelectArtist(artist)}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{artist.name}</span>
                  <span className="text-sm text-gray-500">
                    {artist.releaseCount} release
                    {artist.releaseCount !== 1 && 's'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default ArtistSelect
