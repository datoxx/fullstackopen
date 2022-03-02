const Anecdote = ({anecdote,  handleVote }) => {
    return ( 
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={ handleVote }>vote</button>
            </div>
        </div>
     );
}
 
export default Anecdote;