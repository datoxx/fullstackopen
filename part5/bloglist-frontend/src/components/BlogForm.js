import { useState } from "react";
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  const addBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const responseBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(responseBlog))
    setMessage(`new blog ${newBlog.title} by ${newBlog.author} added!`)
    setTimeout(() => { setMessage(null) }, 5000)
    setTitle("")
    setAuthor("")
    setUrl("")
  }


  const blogForm = () => (
    <form onSubmit={addBlog}>
                title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
                author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
                url:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
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