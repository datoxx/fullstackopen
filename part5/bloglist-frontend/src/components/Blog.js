import React, { useState } from 'react';


const Blog = ({blog, likeBlog}) => {
  const [details, setDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');
  const showDetails = { display: details ? '' : 'none' };

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
     <p> {blog.title} by {blog.author}</p>
     <button onClick={toggleDetails}>{buttonLabel}</button>
     <div style={showDetails}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog.id)}>like</button>
        </p>
        <p>{blog.user.name}</p>
     </div>
  </div>  
)
  
}

export default Blog