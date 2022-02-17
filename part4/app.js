/* eslint-disable linebreak-style */
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

//models
//const User = require('./models/user');
//const Blog = require('./models/blog');

const app = express()


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter )

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app