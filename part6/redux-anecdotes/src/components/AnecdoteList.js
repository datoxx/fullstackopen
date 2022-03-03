import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

import Anecdote from './Anecdote'


const AnecdoteList = () => {
    const {anecdotes, filter } = useSelector(state => state)
    const dispatch = useDispatch()
    
    const filterAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    const sortedAnecdotes = filterAnecdotes.sort((a1, a2) => a2.votes - a1.votes)

    const handleVote = anecdote => {
        dispatch(vote(anecdote.id))
        dispatch(sendNotification(`voted ${anecdote.content}`, 3));
    }

    return ( 
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key = {anecdote.id} 
                    anecdote ={anecdote}
                    handleVote = {() => handleVote(anecdote)} 
                />
            )}
        </div>
    );
}
 
export default AnecdoteList;