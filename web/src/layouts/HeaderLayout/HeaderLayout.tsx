import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import styles from './HeaderLayout.styles'
import { Link } from '@redwoodjs/router'
import { useData } from 'src/store/configureStore'
import Button from '@material-ui/core/Button'
import { logout } from 'src/api/Authorizations'

const useStyles = makeStyles(styles)

const HeaderLayout: React.FC = () => {
  const classes = useStyles()
  const [{ auth, user }] = useData()

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
          <Link to="/" className={classes.title}>
            <Typography variant="h3" data-cy="header-title">
              <b>
                {auth.authenticated
                  ? user?.email || 'Loading...'
                  : 'Welcome! Guest'}
              </b>
            </Typography>
          </Link>
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
