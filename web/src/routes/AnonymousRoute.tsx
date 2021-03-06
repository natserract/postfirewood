import React from 'react'
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
import { LocationDescriptor } from 'history'

type AnonymousRouteProps = {
  isAuthenticated: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component:
    | React.ComponentType<RouteComponentProps<unknown>>
    | React.ComponentType<unknown>
  redirectTo?: LocationDescriptor
} & RouteProps

export const AnonymousRoute: React.FC<AnonymousRouteProps> = (props) => {
  const {
    isAuthenticated,
    redirectTo,
    component: Component,
    ...restProps
  } = props

  return (
    <Route
      render={(props) => {
        if (!isAuthenticated) {
          return <Component {...props} />
        }

        const defaultRedirectTo: LocationDescriptor = {
          pathname: '/dashboard',
          state: { nextPathname: props.location.pathname },
        }

        return <Redirect to={redirectTo || defaultRedirectTo} />
      }}
      {...restProps}
    />
  )
}
