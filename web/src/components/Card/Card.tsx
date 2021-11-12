import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './Card.styles'

type Props = {
  title: string
  date: Date | string
  onClick: () => void
  onDelete: () => void
}

const useStyles = makeStyles(styles)

const CardUI: React.FC<Props> = ({ title, date, onClick, onDelete }) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.cardContentRoot} onClick={onClick}>
        <Typography component="h3" variant="h5" className={classes.title}>
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActRoot}>
        <time>{date}</time>
        <IconButton
          onClick={onDelete}
          aria-label="delete"
          className={classes.cardBtn}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default CardUI
