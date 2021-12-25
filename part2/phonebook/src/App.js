import React, { useState } from 'react'
import List from "./Components/List"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')



  const addName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }

    persons.forEach(nameObj => {
      if(nameObj.name === nameObject.name) {
        alert(`${nameObject.name} is already added to phonebook`)
        setPersons(persons)
      } else {
        setPersons(persons.concat(nameObject))
      }
    });
    
    setNewName("")
  }


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(list => 
          <List key={list.id} list={list} />
          )}
      </ul>
    </div>
  )
}

export default App