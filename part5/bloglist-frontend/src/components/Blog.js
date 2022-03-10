import React, { useState } from 'react';


const Blog = ({user, blog, likeToBlog, removeToBlog}) => {
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
      <p className='title'>{blog.title}</p>
      <button onClick={toggleDetails}>{buttonLabel}</button>
      <div style={showDetails}>
        <a className='url' href={blog.url}>{blog.url}</a>
        <p className='likes'>
          likes {blog.likes}
        </p>
        <button onClick={() => likeToBlog(blog.id)}>like</button>
        <p className='author'>{blog.author}</p>
        {myBlog && <button onClick={() => removeToBlog(blog.id)}>remove</button>}
      </div>
    </div>
  )

}

export default Blog