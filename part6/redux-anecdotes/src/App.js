import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (  
    <div>
      <AnecdoteForm />
      <Notification />
      <AnecdoteList />
    </div>
  )
}

export default App