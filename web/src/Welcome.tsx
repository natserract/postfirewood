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
      <br />

      <Typography component="p" variant="h4">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </Typography>

      <br />
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => browserHistory.push('/sign-in')}
        size="large"
      >
        More Explore
      </Button>
    </Container>
  )
}

export default Welcome
