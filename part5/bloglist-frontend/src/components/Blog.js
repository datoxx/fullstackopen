import React, { useState } from 'react';


const Blog = ({user, blog, likeBlog, removeBlog}) => {
  const [details, setDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');
  const showDetails = { display: details ? '' : 'none' };
  const myBlog = blog.user && user.username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleDetails = () => {
    setDetails(!details)
    setButtonLabel(details ? "view" : "hide" )
  }

  return(
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <button onClick={toggleDetails}>{buttonLabel}</button>
      <div style={showDetails}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog.id)}>like</button>
        </p>
        <p>{blog.author}</p>
        {myBlog && <button onClick={() => removeBlog(blog.id)}>remove</button>}
      </div>
    </div>
  )

}

export default Blog