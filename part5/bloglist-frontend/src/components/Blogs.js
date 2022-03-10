import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Blogs = ({user}) => {

  const { blogs } = useSelector(state => state)
  const dispatch = useDispatch()

  const likeToBlog = (id) => {
    const toLike = blogs.find(b => b.id === id )
    const newObject = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }
    dispatch(likeBlog(newObject))
  }


  const removeToBlog =  (id) => {
    const toRemove = blogs.find(blog => blog.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)
    if(!ok) return

    dispatch(removeBlog(toRemove.id))
  }

  return (
    <div>
      {
        blogs.map((blog) => (
          <Blog
            likeToBlog ={likeToBlog}
            removeToBlog ={removeToBlog}
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  );
}

export default Blogs;