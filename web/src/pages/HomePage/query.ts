const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
    }
  }
`

export default QUERY
