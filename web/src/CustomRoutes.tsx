import React from 'react'
import { useData } from './store/configureStore'
import { Switch } from 'react-router-dom'
import { AnonymousRoute, PrivateRoute } from 'src/routes/'

import App from 'src/layouts/ContainerLayout/ContainerLayout'

import Welcome from 'src/Welcome'
import DashboardPage from 'src/pages/DashboardPage/DashboardPage'
import LoginPage from 'src/pages/LoginPage/LoginPage'
import RegisterPage from 'src/pages/RegisterPage/RegisterPage'

type RoutesProps = {
  isAuthenticated?: boolean
}

const Routes: React.FC<RoutesProps> = () => {
  const [{ auth }, _] = useData()
  const isAuthenticated = auth.authenticated

  return (
    <App>
      <Switch>
        <AnonymousRoute
          component={Welcome}
          isAuthenticated={isAuthenticated}
          path="/"
          exact
        />

        <AnonymousRoute
          component={LoginPage}
          isAuthenticated={isAuthenticated}
          path="/sign-in"
        />

        <AnonymousRoute
          component={RegisterPage}
          isAuthenticated={isAuthenticated}
          path="/sign-up"
        />

        <PrivateRoute
          component={DashboardPage}
          isAuthenticated={isAuthenticated}
          path="/dashboard"
        />
      </Switch>
    </App>
  )
}

export default Routes
