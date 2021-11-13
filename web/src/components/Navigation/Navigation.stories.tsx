import { action } from '@storybook/addon-actions'
import Navigation from './Navigation'

export const Default = () => {
  return (
    <Navigation title="Navigation" onClick={action('clicked')}>
      Navigation Children
    </Navigation>
  )
}

export default { title: 'Components/Navigation' }
