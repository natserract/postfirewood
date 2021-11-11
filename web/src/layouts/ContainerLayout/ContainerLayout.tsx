import React from 'react'
import HeaderLayout from '../HeaderLayout/HeaderLayout'
import { makeStyles } from '@material-ui/core'
import styles from './ContainerLayout.styles'
import Container from '@material-ui/core/Container'
import { Toaster } from '@redwoodjs/web/toast'

const useStyles = makeStyles(styles)

const ContainerLayout: React.FC = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Toaster
        position="bottom-right"
        toastOptions={{ success: { duration: 3000 } }}
      />

      <HeaderLayout />
      <Container maxWidth="md" className={classes.layout}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}

export default ContainerLayout
