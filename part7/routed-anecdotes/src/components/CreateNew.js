import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({addNew, setNotification}) => {
    const navigate = useNavigate()

    const content = useField("text")
    const author = useField("text")
    const info = useField("text")


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.fields.value,
      author: author.fields.value,
      info: info.fields.value,
      votes: 0
    })

    setNotification(`a new anecdote - ${content.value}`)
    setTimeout(() =>  setNotification(''), 5000)

    navigate('/')
  }

  const forReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} required />
        </div>
        <div>
          author
          <input {...author.fields} required />
        </div>
        <div>
          url for more info
          <input {...info.fields} required />
        </div>
        <button type='submit'>create</button>
        <button onClick={forReset} >reset</button>
      </form>
      <br />
    </div>
  )
}
 
export default CreateNew;