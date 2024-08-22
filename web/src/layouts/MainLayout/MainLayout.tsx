import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Toaster />

      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-items-start gap-4">
          <Link
            to={routes.artists()}
            className="text-white hover:text-gray-300"
            aria-label="Home"
          >
            Artists
          </Link>
          <Link
            to={routes.trainingSets()}
            className="text-white hover:text-gray-300"
            aria-label="Training Sets"
          >
            Training Sets
          </Link>
        </div>
      </nav>
      <main className="container m-4">{children}</main>
    </div>
  )
}

export default MainLayout
