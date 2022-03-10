import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers:{
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setLike(state, action) {
      const id = action.payload
      const blogForLike = state.find(b => b.id === id)
      blogForLike.likes += 1
    },
    setDelete(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
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

export const likeBlog = (newObject) => {
  return async dispatch => {
    const likedBlog = await blogService.update(newObject.id, newObject)
    dispatch(setLike(likedBlog.id))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(setDelete(id))
  }
}

export const { setBlogs, appendBlogs, setLike, setDelete } = blogsSlice.actions
export default blogsSlice.reducer

