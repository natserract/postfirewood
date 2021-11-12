import { render } from '@redwoodjs/testing/web'

import PostPage from './PostPage'

describe('PostPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostPage />)
    }).not.toThrow()
  })
})
