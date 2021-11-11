import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import styles from './HeaderLayout.styles'
import { Link } from '@redwoodjs/router'
import { useData } from 'src/store/configureStore'

const useStyles = makeStyles(styles)

const HeaderLayout: React.FC = () => {
  const classes = useStyles()
  const [userData] = useData()

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Link to="/" className={classes.title}>
            <Typography variant="h3" data-cy="header-title">
              <b>
                {userData.auth.authenticated
                  ? userData.user?.email || 'Loading...'
                  : 'Welcome! Guest'}
              </b>
            </Typography>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderLayout
