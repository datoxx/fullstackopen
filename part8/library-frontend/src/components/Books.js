import React from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { all_Books } from '../queries'

const Books = ({show}) => {
  const [genre, setGenre] = useState('all')
  const response = useQuery(all_Books)

  if (!show) {
    return null
  }

  
  if (response.loading) {
    return <div>loading...</div>
  }
console.log(response.data.allBooks)

  const display = genre === 'all' 
    ? response.data.allBooks
    : response.data.allBooks.filter(b => b.genres.indexOf(genre) !== -1) 


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
          {display.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('all')}>all</button>
        <button onClick={() => setGenre('drama')}>drama</button>
        <button onClick={() => setGenre('comedy')}>comedy</button>
        <button onClick={() => setGenre('animation')}>animation</button>
        <button onClick={() => setGenre('fantasy')}>fantasy</button>
      </div>
    </div>
  )
}

export default Books
