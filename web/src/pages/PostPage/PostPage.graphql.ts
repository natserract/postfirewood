export const POST_QUERY = gql`
  query PostQuery($id: String!) {
    post(id: $id) {
      title
      body
    }
  }
`

export const EDITPOST_MUTATION = gql`
  mutation EditPostMutation($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
    }
  }
`
