export const schema = gql`
  type User {
    id: String!
    uid: String!
    name: String!
    email: String!
    emailVerified: Boolean
    gender: String
    phoneNumber: String
    createdAt: DateTime!
    hashedPassword: String!
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [Role]!
    posts: [Post]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    uid: String!
    name: String!
    email: String!
    emailVerified: Boolean
    gender: String
    phoneNumber: String
    hashedPassword: String!
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    uid: String
    name: String
    email: String
    emailVerified: Boolean
    gender: String
    phoneNumber: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
