import { useSelector, useDispatch } from 'react-redux'
import {vote} from './reducers/anecdoteReducer'
import {addAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a1, a2) => a2.votes - a1.votes))
  const dispatch = useDispatch()

  const newAnecdote = e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    dispatch(addAnecdote(anecdote))
    e.target.anecdote.value = ''
  }

  return (  
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}> 
        <div> 
          <input name ='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App