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
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    setNotification(`a new anecdote - ${content.value}`)
    setTimeout(() =>  setNotification(''), 5000)

    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} required />
        </div>
        <div>
          author
          <input {...author} required />
        </div>
        <div>
          url for more info
          <input {...info} required />
        </div>
        <button>create</button>
      </form>
      <br />
    </div>
  )
}
 
export default CreateNew;