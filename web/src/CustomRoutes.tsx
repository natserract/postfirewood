import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useData } from './store/configureStore'
import { Route, Switch } from 'react-router-dom'
import { AnonymousRoute, PrivateRoute } from 'src/routes/'

import App from 'src/layouts/ContainerLayout/ContainerLayout'

import Welcome from 'src/Welcome'
import LoginPage from 'src/pages/LoginPage/LoginPage'
import DashboardPage from 'src/pages/DashboardPage/DashboardPage'

type RoutesProps = {
  isAuthenticated?: boolean
}

const Routes: React.FC<RoutesProps> = () => {
  const [userData, setUserData] = useData()

  useEffect(() => {
    console.log('isAuthenticated', userData.auth.authenticated)
  }, [userData])

  return (
    <App>
      <Switch>
        <AnonymousRoute
          component={Welcome}
          isAuthenticated={userData.auth.authenticated}
          path="/"
          exact
        />

        <AnonymousRoute
          component={LoginPage}
          isAuthenticated={userData.auth.authenticated}
          path="/sign-in"
        />

        <PrivateRoute
          component={DashboardPage}
          isAuthenticated={userData.auth.authenticated}
          path="/dashboard"
        />
      </Switch>
    </App>
  )
}

export default Routes
