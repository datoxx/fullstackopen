import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers:{
    setBlogs(state, action) {
      return action.payload.sort(byLikes)
    },
    appendBlogs(state, action) {
      return state.concat(action.payload).sort(byLikes)
    },
    changeBlog(state, action) {
      const newObj = action.payload
      return state.map(blog => (blog.id === newObj.id ? newObj : blog)).sort(byLikes)
    },
    setDelete(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id).sort(byLikes)
    }
  }
})



export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlogs(newBlog))
  }
}

export const updateBlog = (newObject) => {
  return async dispatch => {
    const changeObj = await blogService.update(newObject.id, newObject)
    dispatch(changeBlog(changeObj))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(setDelete(id))
  }
}

export const { setBlogs, appendBlogs, changeBlog, setDelete } = blogsSlice.actions
export default blogsSlice.reducer

