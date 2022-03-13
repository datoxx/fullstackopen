import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearUser(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers, clearUser } = usersSlice.actions
export default usersSlice.reducer