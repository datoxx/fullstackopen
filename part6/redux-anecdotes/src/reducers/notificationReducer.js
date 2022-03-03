import { createSlice } from "@reduxjs/toolkit";

const notificationSlice =  createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return state =  action.payload
        },
        removeMessage(state) {
           return  state = null
        }

    }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const sendNotification = (message, time) => {
    return dispatch => {
        dispatch(setMessage(message))
        
        setTimeout(() => {
            dispatch(removeMessage())
        }, time * 1000)
    };
};


export default notificationSlice.reducer