import React, { useState, useEffect} from 'react'
import Persons  from "./Components/Persons"
import PersonForm from "./Components/PersonForm"
import Filter from "./Components/Filter"
import Notification from "./Components/Notification"
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

  const [message, setMessage] = useState(null)

  // fetch date from db.json file nad put persons's array.
  useEffect(() => {  
    phoneServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
    
  }, [])
  
  const popup = (msg, type ='success') => {
    setMessage({msg, type})
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addName = (e) => {
    e.preventDefault()
      phoneServices
      .create({
        name: newName,
        number: newNumber
      })
      .then(response => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          popup(`Added ${response.name}`)
      })
      .catch(error => {
        console.log(error);
        popup(`${error.response.data.error}`, 'error')
      })
  }

  const handleDelete = (id) => {
    const phoneDelete = persons.find(p => p.id === id)
    const yes = window.confirm(`Delete ${phoneDelete.name}`)
    if(yes) {
      phoneServices
      .phoneDelete(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id ))
        popup(`Deleted ${phoneDelete.name}`)
      })
      .catch(() => {
        setPersons(persons.filter(person => person.id !== id ))
        popup(`${phoneDelete.name} had already been removed`, 'error')
      })
    }
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
      <Notification message ={message}/>
      <Persons displayList={displayList} handleDelete={handleDelete} />
    </div>
  )
}

export default App