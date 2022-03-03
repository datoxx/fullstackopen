import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
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