import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

 const anecdoteSlice = createSlice({
   name: 'anecdotes',
   initialState: [],
   reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteForVote = state.find(a => a.id === id)
      anecdoteForVote.votes += 1
    },
    addAnecdote(state, action) {
       state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
   }
 })


export const {vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions


export const initialAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(addAnecdote(newAnecdote))
    }
}

export const createVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voted(anecdote)
    dispatch(vote(votedAnecdote.id))
  }
}


export default anecdoteSlice.reducer