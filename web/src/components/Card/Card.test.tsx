import { render } from '@redwoodjs/testing/web'

import Card from './Card'

describe('Card', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Card />)
    }).not.toThrow()
  })
})
