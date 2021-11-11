import { render } from '@redwoodjs/testing/web'

import HomePage from './DashboardPage'

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})
