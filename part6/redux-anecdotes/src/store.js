import { configureStore } from '@reduxjs/toolkit'

import anecdotes from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'

export default configureStore ({
    reducer: {
        anecdotes,
        notification
    }
})