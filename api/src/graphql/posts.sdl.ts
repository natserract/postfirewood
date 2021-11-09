export const schema = gql`
  type Post {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    slug: String!
    body: String!
    image: String
    user: User!
    userId: String!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: String!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    slug: String!
    body: String!
    image: String
    userId: String!
  }

  input UpdatePostInput {
    title: String
    slug: String
    body: String
    image: String
    userId: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: String!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: String!): Post! @requireAuth
  }
`
