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
      color: '#fff',
      padding: 0,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',

      '& h1': {
        fontSize: 24,
      },
    },
  })

export default styles
