// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import MainLayout from './layouts/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/" page={ArtistsPage} name="artists" />
        <Route path="/artist/{id:Int}" page={ArtistPage} name="artist" />
        <Route path="/release/{id:Int}" page={ReleasePage} name="release" />
        <Route path="/training-sets" page={TrainingSetsPage} name="trainingSets" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
