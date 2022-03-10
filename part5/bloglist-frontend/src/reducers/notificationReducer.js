import { createSlice } from '@reduxjs/toolkit'

const blogsSlice =  createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notification(state, action) {
      return state =  action.payload
    }
  }
})

export const { notification } = blogsSlice.actions
export default blogsSlice.reducer