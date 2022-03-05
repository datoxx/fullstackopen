import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        const content = event.target.value
        props.setFilter(content)
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
 

export default connect(null, {setFilter})(Filter);