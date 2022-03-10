import { useField } from "../hook";
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { notification } from "../reducers/notificationReducer";


const BlogForm = () => {

  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const dispatch =  useDispatch()


  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title.inputField.value,
      author: author.inputField.value,
      url: url.inputField.value
    }

    dispatch(createBlog(newBlog))
    dispatch(notification(`new blog ${newBlog.title} by ${newBlog.author} added!`))
    setTimeout(() => {dispatch(notification(null))}, 5000)
    title.setValue("")
    author.setValue("")
    url.setValue("")
  }


  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input {...title.inputField} required />
      <br />
      author: <input {...author.inputField} required />
      <br />
      url: <input {...url.inputField} required />
      <br />
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h3>Create Blog</h3>
      {blogForm()}
    </div>
  );
}

export default BlogForm;