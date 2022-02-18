import React, { useState, useEffect} from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Blogs from './components/Blogs'

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const loggedUserJsObject = JSON.parse(loggedUserJSON)
      setUser(loggedUserJsObject)
      blogService.setToken(loggedUserJsObject.token)
    }
  }, [])

  const handleUserLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      
      <h2>blogs</h2>

      <Notification message={errorMessage}/>

      {
      user === null 
        ? <LoginForm 
           setUser={setUser}
           setErrorMessage={setErrorMessage}
           username ={username}
           setUsername={setUsername}
           password={password}
           setPassword={setPassword}
           /> : 
        <div>

        <p>{user.name} logged-in</p>  
        <button onClick={handleUserLogOut}>logout</button>

        <BlogForm  blogs={blogs}  setBlogs={setBlogs} />
        <Blogs blogs={blogs} />
        
        </div> 
      }
    </div>
  )
}

export default App