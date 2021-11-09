export const schema = gql`
  type Role {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: String!
  }

  type Query {
    roles: [Role!]! @requireAuth
  }

  input CreateRoleInput {
    name: String!
    userId: String!
  }

  input UpdateRoleInput {
    name: String
    userId: String
  }
`
