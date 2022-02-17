/* eslint-disable  */
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const PhoneNote = require('./models/number')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHandle = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({error: 'malformation id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  PhoneNote.find({})
    .then(numbers => {
      res.json(numbers)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const phone = new PhoneNote({
    name: body.name,
    number: body.number
  })

  phone.save()
    .then(newNumber => {
      res.json(newNumber)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(`<h1>Phonebook has info ${phoneBook.length} people </h1> <p>${new Date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  PhoneNote.findById(req.params.id)
    .then(number => {
      res.json(number)
    })

})

app.delete('/api/persons/:id', (req, res, next) => {
  PhoneNote.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

app.use( errorHandle)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
