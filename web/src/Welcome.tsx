import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { browserHistory } from 'src/utils/history'

const Welcome = () => {
  return (
    <Container>
      <Typography component="h1" variant="h3">
        Welcome!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => browserHistory.push('/sign-in')}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => browserHistory.push('/sign-up')}
      >
        Sign Up
      </Button>
    </Container>
  )
}

export default Welcome
