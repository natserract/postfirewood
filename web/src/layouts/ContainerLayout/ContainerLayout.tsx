import React from 'react'
import HeaderLayout from '../HeaderLayout/HeaderLayout'
import { makeStyles } from '@material-ui/core'
import styles from './ContainerLayout.styles'
import Container from '@material-ui/core/Container'
import { Toaster } from '@redwoodjs/web/toast'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useData } from 'src/store/configureStore'

const useStyles = makeStyles(styles)

const ContainerLayout: React.FC = (props) => {
  const classes = useStyles()
  const [{ auth, user }] = useData()

  return (
    <React.Fragment>
      <Toaster
        position="bottom-right"
        toastOptions={{ success: { duration: 3000 } }}
      />

      <HeaderLayout />
      <Container maxWidth="md" className={classes.layout}>
        {auth.authenticated && !user.emailVerified && (
          <div className={classes.alert}>
            <Alert severity="warning" variant="outlined">
              <AlertTitle>Confirm your email address!</AlertTitle>
              <p>
                Thanks for joining Redwood!. To finish signing up, please
                confirm your email address.
              </p>

              <p>
                This ensures we have right email in case we need to contact you.
              </p>
            </Alert>
          </div>
        )}
        {props.children}
      </Container>
    </React.Fragment>
  )
}

export default ContainerLayout
