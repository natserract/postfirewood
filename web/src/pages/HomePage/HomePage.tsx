// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {
  const { logIn, logOut, isAuthenticated, userMetadata } = useAuth()

  return (
    <>
      <MetaTags
        title="Home"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
    You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>HomePage</h1>
      <p>{JSON.stringify(userMetadata)}</p>
      <button
        className="link-button"
        onClick={
          isAuthenticated
            ? logOut
            : () =>
                logIn({
                  email: 'alfins132@gmail.com',
                  password: 'Alfin9090',
                })
        }
      >
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </button>
    </>
  )
}

export default HomePage
