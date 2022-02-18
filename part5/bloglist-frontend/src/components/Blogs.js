import Blog from './Blog'

const Blogs = ({blogs}) => {

    const blogList = () => (blogs.map(blog => <Blog key={blog.id} blog={blog} />))

    return (
      <>
        {blogList()}
      </>  
     );
}
 
export default Blogs;