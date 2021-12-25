import React, { useState } from 'react'
import List from "./Components/List"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '34-44-43323456', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  const addName = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    persons.forEach(nameObj => {
      if(nameObj.name === nameObject.name) {
        alert(`${nameObject.name} is already added to phonebook`)
        setNewName("")
        return setPersons(persons);
      } else if(nameObj.number === nameObject.number) {
        alert(`${nameObject.number} is already added to phonebook`)
        setNewNumber("")
        return setPersons(persons);
      } else {
        setPersons(persons.concat(nameObject))
        setNewName("")
        setNewNumber("")
      }
    });
  }


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
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
          number: <input
           value={newNumber}
           onChange={handleNumberChange}
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