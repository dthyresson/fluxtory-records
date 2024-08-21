import { Metadata } from '@redwoodjs/web'

import ReleaseCell from 'src/components/ReleaseCell'
const ReleasePage = ({ id }: { id: number }) => {
  return (
    <>
      <Metadata title="Release" description="Release page" />
      <ReleaseCell id={id} />
    </>
  )
}

export default ReleasePage
