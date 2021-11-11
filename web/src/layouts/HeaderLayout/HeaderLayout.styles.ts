import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      paddingTop: 15,
      color: '#fff',

      '& h3': {
        fontSize: 24,
      },
    },
  })

export default styles
