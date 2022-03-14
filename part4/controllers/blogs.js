/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs : 0})
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.title === undefined || body.url === undefined) {
    return response.status(400).json({error: 'blog is invalid'})
  } 

  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'You are not authenticated!' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
  })

  const saveBlog = await blog.save()

  user.blogs = user.blogs.concat(saveBlog.id)
  await user.save()

  response.status(201).json(saveBlog)
})


blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const upDateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})  
  response.json(upDateBlog)
})

blogsRouter.post('/:id/comments', async(request, response) => {
  const { comment } = request.body

  const blogUpdate = await Blog.findById(request.params.id, {}).populate(
    'user',
    {username: 1, name: 1}
  )
  
  blogUpdate.comments = blogUpdate.comments.concat(comment)
  await blogUpdate.save()
  response.json(blogUpdate)

})


module.exports = blogsRouter