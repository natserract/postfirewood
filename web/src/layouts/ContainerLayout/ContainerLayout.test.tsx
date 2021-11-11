import { render } from '@redwoodjs/testing/web'

import ContainerLayout from './ContainerLayout'

describe('ContainerLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContainerLayout />)
    }).not.toThrow()
  })
})
