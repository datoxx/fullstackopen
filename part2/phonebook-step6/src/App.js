import React, { useState, useEffect} from 'react'
import Filter from "./Components/Filter"
import PersonForm from "./Components/PersonForm"
import Persons  from "./Components/Persons"
import axios from 'axios'
import phoneServices from "./Components/services"

const App = () => {
  // list  of number an name 
  const [persons, setPersons] = useState([]) 
  // name's input value
  const [newName, setNewName] = useState('')
  // number's input value 
  const [newNumber, setNewNumber] = useState('')
  // filter's inputs value
  const [filterText, setFilterText] = useState('')

  // fetch date from db.json file nad put persons's array.
  useEffect(() => {  
    phoneServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
    
  }, [])
  
  // form's event handle, this function adds new phone book  object in initial array
  // also this function includes alert function, if array's has name or number which user typing in from, alarm tells about it 
  const addName = (e) => {
    e.preventDefault()
    // new phone book object create
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // check if array has  name or number which user typing, and pop up alert
    phoneServices
    .create(nameObject)
    .then(response => {
      persons.forEach(nameObj => {
        if(nameObj.name === nameObject.name) {
          alert(`${nameObject.name} is already added to phonebook`)
          setNewName("")
         return setPersons(persons)
        } else {
          setNewName("")
          setNewNumber("")
          return setPersons(persons.concat(response))
        }
      })
    })
    .catch(rej => {
      console.log(rej);

    })
          
  }

  const handleDelete = (id) => {
    phoneServices
    .phoneDelete(id)
    .then(response => {
      console.log(response)
      window.confirm(`Do you really want to delete?`);
      setPersons(persons.filter(person => person.id !== id ))
    })
    
  }

  // name input's event handler for change input value
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  // number input's event handler for change input value
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  // filter input's event handler for change input value
  const handleFilterChanges = (e) => {
    setFilterText(e.target.value.toLowerCase())
  }


  // check if filter user do not search by input, displayList shows all phone book list
  // if use search displayList  shows user only that phone book list that search user.
  const displayList = filterText === '' 
  ? persons 
  : persons.filter(list => list.name.toLowerCase().includes(filterText))


  return (
    <div>
     { /*this filter input search phone books*/}
      <h1>Phonebook</h1>
      <Filter filterText={ filterText } handleFilterChanges={handleFilterChanges} />

      { /*this components has form's witch has two input name and number witch creates new phone books*/}
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
       />
        { /*this components rendering all phone book list and display*/}
      <h2>Numbers</h2>
      <Persons displayList={displayList} handleDelete={handleDelete} />
    </div>
  )
}

export default App