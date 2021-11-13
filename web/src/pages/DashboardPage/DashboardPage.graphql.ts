export const USER_QUERY = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      name
      email
      emailVerified
    }
  }
`
export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
      emailVerified
    }
  }
`

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const CREATEPOST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`

export const DELETEPOST_MUTATION = gql`
  mutation DeletePostMutation($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`
