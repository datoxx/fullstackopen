import React, { useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
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



  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id )
    const newObject = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    const updatedBlog = await blogService.update(newObject.id, newObject)
    const updatedBlogs = blogs.map(b => b.id === id ? updatedBlog : b)
    setBlogs(updatedBlogs)
}

  const handleUserLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const renderBlogs = blogs.map((blog) => (
    <Blog  
      likeBlog ={likeBlog}  
      key={blog.id} 
      blog={blog}  
    /> 
  ))

  return (
    <div>
      
      <Notification  message={message}/>

      {
      user === null ?
       <Toggleable buttonLabel="login">
         <LoginForm 
           setUser={setUser}
           setErrorMessage={setMessage}
           />
      </Toggleable> : 
        <div>

        <p>{user.name} logged-in</p> 
        <button onClick={handleUserLogOut}>logout</button>

        <Toggleable buttonLabel="create blog">
        <BlogForm  blogs={blogs}  setBlogs={setBlogs} setMessage={setMessage} />
        </Toggleable>

        <h2>blogs</h2>
        {renderBlogs}   
        </div> 
      }
    </div>
  )
}

export default App