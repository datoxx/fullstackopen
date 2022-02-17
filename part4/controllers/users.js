/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const body = request.body

 
  const users = await User.find({})
  const usernames = users.some(user => user.username === body.username)

  if(usernames) {
    return response.status(400).json({error: ' username is exist'})
  }

  if(!body.password || body.password.length < 3) {
    return response.status(400).json({error: 'missing username or password'})
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const saveUser = await user.save()

  response.json(saveUser)
})


usersRouter.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0})
  response.json(users)
})


module.exports = usersRouter