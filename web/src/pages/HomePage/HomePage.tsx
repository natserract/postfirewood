// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useData } from 'src/store/configureStore'
import { loginUser, logout } from 'src/api/Authorizations'

const HomePage = () => {
  const [{ auth }] = useData()

  const handleSignIn = async () => {
    const data = {
      email: 'alfins132@gmail.com',
      password: 'Alfin9090',
    }

    try {
      const responseData = await loginUser(data.email, data.password)
      console.log('responseData signIn', responseData)
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
        onClick={auth.authenticated ? handleSignOut : handleSignIn}
      >
        {auth.authenticated ? 'Log Out' : 'Log In'}
      </button>

      {JSON.stringify(auth)}
    </>
  )
}

export default HomePage
