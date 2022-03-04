import { createSlice } from "@reduxjs/toolkit";

const notificationSlice =  createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return state =  action.payload
        }
    }
})

export const { setMessage } = notificationSlice.actions



export const sendNotification = (message, time) => {
    return dispatch => {
        dispatch(setMessage(message)) 
        setTimeout(() => {
            dispatch(setMessage(null))
        }, time * 1000)
    };
};


export default notificationSlice.reducer