// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import TrainingSetCreatePage from 'src/pages/TrainingSetCreatePage/TrainingSetCreatePage'

const Routes = () => {
  return (
    <Router>
      <Route path="/training-sets/new" page={TrainingSetCreatePage} name="createTrainingSet" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
