import { render } from '@redwoodjs/testing/web'

import HeaderLayout from './HeaderLayout'

describe('HeaderLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeaderLayout />)
    }).not.toThrow()
  })
})
