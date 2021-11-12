import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (_theme: Theme) =>
  createStyles({
    cardRoot: {
      position: 'relative',
      height: 234,
      borderRadius: 12,
      padding: 10,
    },
    cardContentRoot: {
      padding: 10,
      cursor: 'pointer',
      height: '100%',
    },
    cardActRoot: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',

      '& time': {
        color: 'rgb(102, 102, 102)',
      },
    },
    title: {
      color: '#111111',
      fontWeight: 'bold',
    },
    cardBtn: {
      marginRight: '-12px',
    },
  })

export default styles
