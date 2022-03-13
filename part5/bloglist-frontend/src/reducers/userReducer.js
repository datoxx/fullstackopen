import { createSlice } from '@reduxjs/toolkit'

const useSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearUser(state, action) {
      return null
    }
  }
})

export const{ setUser, clearUser } = useSlice.actions
export default useSlice.reducer