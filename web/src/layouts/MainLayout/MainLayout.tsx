import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <Link
            to={routes.artists()}
            className="text-white hover:text-gray-300"
            aria-label="Home"
          >
            Artists
          </Link>
        </div>
      </nav>
      <main className="container mx-auto mt-4">{children}</main>
    </div>
  )
}

export default MainLayout
