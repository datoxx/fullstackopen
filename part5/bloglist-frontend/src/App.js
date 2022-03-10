import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'




const App = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  //const byLikes = (b1, b2) => b2.likes - b1.likes

  useEffect(() => {
    dispatch(initializeBlogs())
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

      <Notification  />

      {
        user === null ?
          <LoginForm setUser={setUser}/> :
          <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleUserLogOut}>logout</button>

            <Toggleable buttonLabel="create blog">
              <BlogForm  />
            </Toggleable>

            <h2>blogs</h2>
            <Blogs user={user} />
          </div>
      }
    </div>
  )
}

export default App