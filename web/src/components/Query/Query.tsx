import { useQuery } from '@redwoodjs/web'
import React from 'react'
import { extractError } from 'src/utils/errors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DocumentNode = any

type QueryProps = {
  query: DocumentNode
  id?: string
  where?: string
  children: (data) => React.ReactElement
}

const Query: React.FC<QueryProps> = ({ children, query, id, where }) => {
  const { data, loading, error } = useQuery(query, {
    variables: {
      id,
      where,
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <p>Error: {extractError(error).message}</p>
  }
  return children({ data })
}

export default Query
