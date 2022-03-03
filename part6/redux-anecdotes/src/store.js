import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'

export default configureStore ({
    reducer: {
        anecdotes: anecdoteReducer
    }
})