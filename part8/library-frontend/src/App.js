import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommend from './components/Recommend'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  
  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('user-token', token)
    if (savedToken) {
      setToken(savedToken)
    }
  }, [token])

  const notify = (message) =>{
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logOut}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notify} token={token} />

      <Books show={page === 'books'}  />

    {token === null 
    ? <LoginForm show={page === 'login'} setError={notify} setToken={setToken} />
    : <>
      <NewBook show={page === 'add'} setError={notify} />
      <Recommend show={page === 'recommend'} setError={notify} />
      </>
    }
      

    </div>
  )
}

export default App
