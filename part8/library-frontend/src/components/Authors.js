import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { all_Authors, change_birthYear } from '../queries'



const Authors = ({show }) => {
  const response = useQuery(all_Authors)
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [ changeBirthYear ] = useMutation(change_birthYear, {
    refetchQueries: [{query: all_Authors}]
  })

  if (!show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  const handleBornYear = (e) => {
    e.preventDefault()
    changeBirthYear({ variables: {name, setBornTo} })

    setName('')
    setSetBornTo('')
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

      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={handleBornYear}>
          name <br />
          <input 
          type="text" 
            value={name} 
            onChange={(e) => {setName(e.target.value)}}
           />
          <br />
          born year <br />
          <input 
            type="number"
            value={setBornTo} onChange={(e) => {setSetBornTo(parseInt(e.target.value))} }
           />
           <br />
          <button type='submit'>set year</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
