import React from 'react'
const Blog = ({blog}) => (
  <div>
     <p> title: {blog.title}</p>
     <p> author: {blog.author}</p> 
  </div>  
)

export default Blog