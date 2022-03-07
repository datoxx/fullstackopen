import { useState } from 'react'
import { useMatch, Routes, Route } from "react-router-dom"

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import Notification from './components/Notification'



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <div> 
        <h1>Software anecdotes</h1>

        <Menu />
        <Notification notification ={notification} />

        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} vote={vote} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification ={setNotification} />} />   
        </Routes>  

      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App