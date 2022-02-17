/* eslint-disable */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const notebook = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minLength: 3},
  number: {type:  String, required: true, minLength: 8}
})

notebook.plugin(uniqueValidator)



notebook.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('PhoneNote', notebook)