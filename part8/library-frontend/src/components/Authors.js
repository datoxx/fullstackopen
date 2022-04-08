import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';

import { all_Authors, change_birthYear } from '../queries'



const Authors = ({ show, setError }) => {
  const response = useQuery(all_Authors)
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [ changeBirthYear, result ] = useMutation(change_birthYear, {
    refetchQueries: [{query: all_Authors}],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data && result.data.editAuthor === null) {
      setError('author not found ')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

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
      <div style={{width: '200px'}}>
        <form onSubmit={handleBornYear}>
          name <br />
           <Select 
            defaultValue={null} 
            onChange={(e) => setName(e.value)}
            options={response.data.allAuthors.map(a => ({value: a.name, label: a.name}))}
           />
          <br />
          born year <br />
          <input 
            type="number"
            value={setBornTo} onChange={(e) => {setSetBornTo(parseInt(e.target.value))} }
            style={{width: '95%'}}
           />
           <br />
          <button type='submit'>set year</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
