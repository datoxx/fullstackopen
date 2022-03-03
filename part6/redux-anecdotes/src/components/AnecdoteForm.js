import { useDispatch } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = e => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        dispatch(addAnecdote(anecdote))
        e.target.anecdote.value = ''

        dispatch(sendNotification(`create ${anecdote}`, 5))
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