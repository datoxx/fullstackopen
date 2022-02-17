/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const  mongoose  = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('return blogs', () => {
  test('blog are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('amount of blog posts', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog id ', async() => {
    const response = await api.get('/api/blogs')
  
    const identId = response.body.map(item => item.id)
    expect(identId).toBeDefined()
  })

  test('succeeds with a valid id', async() => {
    const blogs = await Blog.find({})
    const blogToView = blogs[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})


describe('addition of a new blog', () => {
  test('add new blog', async() => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map(item => item.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain('First class tests')
  })

  test('miss like property', async() => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const blogs = await Blog.find({})
  
    expect(blogs[2].likes).toBe(0)
  })
  
  test('status code 400 if data invalid', async() => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 3
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogs = await Blog.find({})

    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async() => {
    const blogs = await Blog.find({})
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const newBlogs= await Blog.find({})

    expect(newBlogs).toHaveLength(helper.initialBlogs.length - 1)

    const title = newBlogs.map(item => item.title)

    expect(title).not.toContain(blogToDelete.title)

  })
})



afterAll(() => {
  mongoose.connection.close()
})