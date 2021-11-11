import React from 'react'
import { MetaTags } from '@redwoodjs/web'
import { useCached, useData } from 'src/store/configureStore'
import { loginUser, logout } from 'src/api/Authorizations'
import Query from 'src/components/Query/Query'
// import { UsersQuery } from 'types/graphql'
import UsersQuery from './DashboardPage.graphql'
import { createUser } from 'src/api/ManageUser'
import { setItem$ } from 'src/utils/storage'

const DashboardPage = () => {
  const [data] = useData()
  const [cached] = useCached()

  const handleSignUp = async () => {
    const data = {
      email: 'benjaminstwo@gmail.com',
      password: 'Alfin9090',
    }

    try {
      const responseData = await createUser(data.email, data.password, cached)
      console.log('responseData createUser', responseData)
    } catch (error) {
      //
    }
  }

  return (
    <>
      <MetaTags
        title="Home"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>HomePage</h1>
      {/* <p>{JSON.stringify(userMetadata.accessToken)}</p> */}
      {/* <button
        className="link-button"
        onClick={data.auth.authenticated ? handleSignOut : handleSignIn}
      >
        {data.auth.authenticated ? 'Log Out' : 'Log In'}
      </button>

      {JSON.stringify(data)}

      <br />
      <button onClick={handleSignUp}>SignUp</button>

      <Query query={UsersQuery}>
        {({ data }) => {
          return <div>{JSON.stringify(data)}</div>
        }}
      </Query> */}
      <Query query={UsersQuery}>
        {({ data }) => {
          return <div>{JSON.stringify(data)}</div>
        }}
      </Query>
    </>
  )
}

export default DashboardPage
