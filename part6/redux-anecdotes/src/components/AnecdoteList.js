import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'

import Anecdote from './Anecdote'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const sortedAnecdotes = [...anecdotes].sort((a1, a2) => a2.votes - a1.votes)

    return ( 
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key = {anecdote.id} 
                    anecdote ={anecdote}
                    handleVote = {() => dispatch(vote(anecdote.id))} 
                />
            )}
        </div>
    );
}
 
export default AnecdoteList;