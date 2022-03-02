import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'

import Anecdote from './Anecdote'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.sort((a1, a2) => a2.votes - a1.votes))
    const dispatch = useDispatch()

    return ( 
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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