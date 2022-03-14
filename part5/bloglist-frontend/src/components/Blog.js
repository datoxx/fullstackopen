import { useField } from '../hook'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from "react-router-dom"


const Blog = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const comment = useField('text')
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id ))
  const user = useSelector((state) => state.user)


  if(!blog) {
    return null
  }

  const own = user && blog.user && user.username === blog.user.username

  const likeToBlog = () => {
    const newObject = {
      ...blog,
      likes: (blog.likes||0) + 1,
      user: blog.user.id
    }
    dispatch(updateBlog(newObject))
  }


  const removeToBlog =  () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if(!ok) return

    dispatch(removeBlog(blog.id))
    navigate('/')
  }

  const addComment = (e) => {
    e.preventDefault()

    const newObj = {
      ...blog,
      comments: blog.comments.concat(comment.inputField.value),
      user: blog.user.id
    }
    dispatch(updateBlog(newObj))
    comment.setValue('')
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(
    <div style={blogStyle}>
      <h2 className='title'>{blog.title}</h2>
      <h2 className='author'>{blog.author}</h2>
      <a className='url' href={blog.url}>{blog.url}</a>
      <p className='likes'> likes {blog.likes}</p>
      <button onClick={likeToBlog}>like</button>
      {own && <button onClick={removeToBlog}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={addComment} >
        <input {...comment.inputField}  required />
        <button type='submit'>add comment</button>
        <ul>
          {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </form>
    </div>
  )

}

export default Blog