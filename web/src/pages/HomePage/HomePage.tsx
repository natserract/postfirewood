import React from 'react'
import { MetaTags } from '@redwoodjs/web'
import { useCached, useData } from 'src/store/configureStore'
import { loginUser, logout } from 'src/api/Authorizations'
import Query from 'src/components/Query/Query'
// import { UsersQuery } from 'types/graphql'
import UsersQuery from './query'
import { createUser } from 'src/api/ManageUser'
import { setItem$ } from 'src/utils/storage'

const HomePage = () => {
  const [data] = useData()
  const [cached] = useCached()

  const handleSignIn = async () => {
    // TODO: CREATE FORM FOR SIGNIN
    const data = {
      email: 'alfins132@gmail.com',
      password: 'Alfin9090',
    }

    try {
      const responseData = await loginUser(data.email, data.password, cached)
      const token = await responseData.user.getIdToken()

      console.log('TOKEN', token)
      // setItem$('token', token, cached, true).subscribe((p) => {
      //   console.log('Ho', p)
      // })
    } catch (error) {
      console.error('error', error.code)
    }
  }

  const handleSignOut = async () => {
    try {
      const responseData = await logout()
      console.log('responseData Logout', responseData)
    } catch (error) {
      //
    }
  }

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
      <button
        className="link-button"
        onClick={data.auth.authenticated ? handleSignOut : handleSignIn}
      >
        {data.auth.authenticated ? 'Log Out' : 'Log In'}
      </button>

      {JSON.stringify(data)}

      <br />
      <button onClick={handleSignUp}>SignUp</button>

      {/* <Query query={UsersQuery}>
        {({ data }) => {
          return <div>{JSON.stringify(data)}</div>
        }}
      </Query> */}
    </>
  )
}

export default HomePage
