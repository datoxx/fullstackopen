import React from 'react'
import { gql, useQuery } from '@apollo/client'

const all_Authors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = ({show, authors}) => {
  const response = useQuery(all_Authors)

  if (!show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {response.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
