import { sendNotification } from '../reducers/notificationReducer'
import {createAnecdote} from  '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const newAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        props.createAnecdote(content)
        props.sendNotification(`create ${content}`, 5)
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
 
const mapDispatchToProps = {
    createAnecdote,
    sendNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);