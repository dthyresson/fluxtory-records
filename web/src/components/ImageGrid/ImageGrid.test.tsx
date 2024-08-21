import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import ImageGrid from './ImageGrid'

// Mock the useLazyLoad hook
jest.mock('../../utils/imageHelpers', () => ({
  useLazyLoad: () => true,
}))

const mockImages = [
  { id: 1, uri: 'image1.jpg', releaseId: 101 },
  { id: 2, uri: 'image2.jpg', releaseId: 102 },
  { id: 3, uri: 'image3.jpg', releaseId: 103 },
]

describe('ImageGrid', () => {
  it('renders the correct number of images', () => {
    render(
      <ImageGrid
        images={mockImages}
        onImageSelect={() => {}}
        selectedImages={[]}
      />
    )

    const imageElements = screen.getAllByRole('img')
    expect(imageElements).toHaveLength(mockImages.length)
  })

  it('calls onImageSelect when an image is clicked', () => {
    const mockOnImageSelect = jest.fn()
    render(
      <ImageGrid
        images={mockImages}
        onImageSelect={mockOnImageSelect}
        selectedImages={[]}
      />
    )

    const firstImage = screen.getAllByRole('img')[0]
    fireEvent.click(firstImage)

    expect(mockOnImageSelect).toHaveBeenCalledWith(mockImages[0])
  })

  it('applies selected style to selected images', () => {
    const selectedImage = mockImages[1]
    render(
      <ImageGrid
        images={mockImages}
        onImageSelect={() => {}}
        selectedImages={[selectedImage]}
      />
    )

    const imageContainers = screen.getAllByTestId('image-container')
    expect(imageContainers[1]).toHaveClass('ring-2 ring-indigo-500')
    expect(imageContainers[0]).not.toHaveClass('ring-2 ring-indigo-500')
    expect(imageContainers[2]).not.toHaveClass('ring-2 ring-indigo-500')
  })

  it('applies correct grid layout classes', () => {
    render(
      <ImageGrid
        images={mockImages}
        onImageSelect={() => {}}
        selectedImages={[]}
      />
    )

    const gridContainer = screen.getByTestId('image-grid')
    expect(gridContainer).toHaveClass(
      'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
    )
  })

  it('renders images with correct attributes', () => {
    render(
      <ImageGrid
        images={mockImages}
        onImageSelect={() => {}}
        selectedImages={[]}
      />
    )

    const imageElements = screen.getAllByRole('img')
    imageElements.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockImages[index].uri)
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveClass('h-full w-full object-cover')
    })
  })
})
