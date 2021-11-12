import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import styles from './HeaderLayout.styles'
import { useData } from 'src/store/configureStore'
import Button from '@material-ui/core/Button'
import { logout } from 'src/api/Authorizations'
import { browserHistory } from 'src/utils/history'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(styles)

const HeaderLayout: React.FC = () => {
  const classes = useStyles()
  const [{ auth, user }] = useData()
  const location = useLocation()

  const handleSignOut = async () => {
    try {
      return await logout()
    } catch (error) {
      console.error('error', error.code)
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <button
            onClick={() =>
              browserHistory.push('/dashboard', {
                from: location.pathname,
              })
            }
            className={classes.title}
          >
            <Typography variant="h3" component="h1">
              <b>
                {auth.authenticated
                  ? user?.email || 'Loading...'
                  : 'Welcome! Guest'}
              </b>
            </Typography>
          </button>
        </Container>

        {auth.authenticated && (
          <Button color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HeaderLayout
