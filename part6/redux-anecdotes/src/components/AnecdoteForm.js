import { useDispatch } from 'react-redux'
import { sendNotification } from '../reducers/notificationReducer'
import {createAnecdote} from  '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        dispatch(sendNotification(`create ${content}`, 5))
    }


    return ( 
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}> 
                <div> 
                    <input name ='anecdote' required/>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
     );
}
 
export default AnecdoteForm;