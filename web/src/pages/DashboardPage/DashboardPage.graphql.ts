const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
      emailVerified
    }
  }
`

export default QUERY
