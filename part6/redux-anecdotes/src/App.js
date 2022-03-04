import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'


import { initialAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAnecdotes())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (  
    <div>
      <AnecdoteForm />
      <Notification />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App