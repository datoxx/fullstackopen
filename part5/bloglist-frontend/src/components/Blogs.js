import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

const Blogs = () => {

  const { blogs } = useSelector(state => state)

  return (
    <div>
      <ul>
        {
          blogs.map((blog) => (
            <li key={blog.id}>
              <Link  to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Blogs;