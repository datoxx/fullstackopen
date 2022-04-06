import React from 'react'
import { gql, useQuery } from '@apollo/client'

const all_Books = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

const Books = ({show}) => {
  const response = useQuery(all_Books)

  if (!show) {
    return null
  }

  
  if (response.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {response.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
