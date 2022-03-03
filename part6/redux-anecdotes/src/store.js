import { configureStore } from '@reduxjs/toolkit'

import anecdotes from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer'

export default configureStore ({
    reducer: {
        anecdotes,
        notification,
        filter
    }
})