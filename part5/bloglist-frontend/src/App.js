import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Navigate} from "react-router-dom"

import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

import { Typography } from '@material-ui/core'


const App = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const loggedUserJsObject = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUserJsObject))
      blogService.setToken(loggedUserJsObject.token)
    }
  }, [])


  return (
    <div>
      <div>
        <Navigation />
        <Typography
          variant='h3'
          component='h1'
          color='primary'
          align='center'
          gutterBottom
        >
            blog app
        </Typography>
        <Notification  />
      </div>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/login' element={ <LoginForm  />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/create' element={ <BlogForm  />} />
        <Route path='/users/:id' element={ <User />}/>
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
      </Routes>
    </div>
  )
}

export default App