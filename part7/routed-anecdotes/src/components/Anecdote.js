import { useParams } from "react-router-dom"
import Footer from './Footer'

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))

    return (  
        <div>
            <h2>'{ anecdote.content }'<i> by </i>{ anecdote.author }</h2>
            <p>has { anecdote.votes } votes</p>
            <p>for more info see <a href={anecdote.info}>{ anecdote.info }</a></p>
            <Footer />
        </div>
    );
}
 
export default Anecdote;