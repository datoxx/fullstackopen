import { useField } from "../hook";
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { useNavigate } from "react-router-dom"


const BlogForm = () => {


  const user = useSelector((state) => state.user)

  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title.inputField.value,
      author: author.inputField.value,
      url: url.inputField.value
    }


    if(!user) {
      return  dispatch(sendNotification(`you need  to login for create blog`))
    }

    dispatch(createBlog(newBlog))
    dispatch(sendNotification(`new blog ${newBlog.title} by ${newBlog.author} added!`))
    title.setValue("")
    author.setValue("")
    url.setValue("")
    navigate('/')
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
      <h2>Create Blog</h2>
      {blogForm()}
    </div>
  );
}

export default BlogForm;