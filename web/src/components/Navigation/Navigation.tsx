import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import styles from './Navigation.styles'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(styles)

type Props = {
  title: string | string[]
  children: React.ReactNode
  onClick: () => void
}

const Navigation: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.activityContainer}>
        <aside className={classes.asideLeft}>
          <Typography
            className={classes.activityTitle}
            component="h2"
            variant="h4"
          >
            {props.title}
          </Typography>
        </aside>
        <aside className={classes.asideRight}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.btnAdd}
            onClick={props.onClick}
          >
            Add
          </Button>
        </aside>
      </div>

      {props.children}
    </React.Fragment>
  )
}

export default Navigation
