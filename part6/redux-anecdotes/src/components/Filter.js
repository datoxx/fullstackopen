import { useDispatch } from "react-redux"
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const content = event.target.value
        dispatch(setFilter(content))
      }
      const style = {
        marginTop: 20,
        marginBottom: 5
      }
    
      return (
        <div style={style}>
           <h3>Filter anecdote</h3>
          <input onChange={handleChange} />
        </div>
    )
}
 
export default Filter;