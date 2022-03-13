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



let timeId = null

export const sendNotification = (message) => {
  return dispatch => {
    dispatch(notification(message))

    if(timeId){
      clearTimeout(timeId)
    }

    timeId = setTimeout(() => {
      dispatch(notification(null))
    }, 5000)
  }
}

export const { notification } = blogsSlice.actions
export default blogsSlice.reducer