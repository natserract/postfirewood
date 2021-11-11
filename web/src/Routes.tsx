// NOTE:
// WE NOT USED THIS!!!, CUSTOM ROUTE on {CustomRoute.tsx}
// NOT DELETED THIS FILE, BECAUSE REDWOOD_CLI NEED THIS FILE FOR GENERATE PAGE
//
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
//
// Handle private routes @see https://redwoodjs.com/docs/router#sets-of-routes

import { Router, Route, Set, Private } from '@redwoodjs/router'
import ContainerLayout from './layouts/ContainerLayout/ContainerLayout'
import DashboardPage from './pages/DashboardPage/DashboardPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/register" page={RegisterPage} name="register" />
      <Set wrap={ContainerLayout}>
        <Route path="/" page={LoginPage} name="login" />

        <Private unauthenticated="login">
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        </Private>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
