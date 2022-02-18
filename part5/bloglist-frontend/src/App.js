/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const loggedUserJsObject = JSON.parse(loggedUserJSON)
      setUser(loggedUserJsObject)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const responseAboutUser = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(responseAboutUser))

      setUser(responseAboutUser)
      setUsername("")
      setPassword("")
    } catch (exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const hanldeUserLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text" 
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input 
          type="password" 
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )




const blogList = () => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
)


  return (
    <div>
      
      <h2>blogs</h2>

      <Notification message={errorMessage}/>

      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged-in</p> 
          <button onClick={hanldeUserLogOut}>logout</button>
          {blogList()}
        </div>
      }

    </div>
  )
}

export default App