import Footer from './Footer'

const AnecdoteList = ({ anecdotes }) => {
    return ( 
        <div>
            <h2>Anecdotes</h2>
            <ul>
            {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
            </ul>
            <Footer />
        </div>
     );
}
 
export default AnecdoteList;