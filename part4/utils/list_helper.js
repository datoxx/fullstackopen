/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

const dummy = (blogs) => {
  let one = 1
  let array = blogs
  
  return array = one
}

const totalLikes = (blogs) => {
  let likes = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  let favor = blogs.map(blog => ({title: blog.title, author: blog.author, likes: blog.likes}))
    .sort((a, b) => b.likes - a.likes)
  let holdOne = favor[0]
  return holdOne
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}