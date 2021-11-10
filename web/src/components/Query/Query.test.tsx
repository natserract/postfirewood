import { render } from '@redwoodjs/testing/web'

import Query from './Query'

describe('Query', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Query />)
    }).not.toThrow()
  })
})
