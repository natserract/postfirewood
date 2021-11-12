import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    postTitle: {
      marginBottom: 20,
    },
    postContent: {
      fontSize: 15,
    },
    btnEdit: {
      width: 70,
      minWidth: 70,
      color: '#A4A4A4',
      marginTop: '-20px',

      '&:hover': {
        background: 'transparent',
      },
    },
    postTitleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  })

export default styles
