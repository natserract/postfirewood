import { useQuery } from '@redwoodjs/web'
import React from 'react'

type QueryProps = {
  query: any
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
    return <p>Error: {JSON.stringify(error)}</p>
  }
  return children({ data })
}

export default Query
