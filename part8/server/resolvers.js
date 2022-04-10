require('dotenv').config()
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
    Query: {
      bookCount: async () =>  Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if(!args.author  && !args.genre) {    
          return Book.find({}).populate('author')
        } 
        let books = await Book.find({}).populate('author')
        if (args.author)
          books = books.filter((book) => book.author.name === args.author)
  
        if (args.genre) {
          books = books.filter(
            (book) => book.genres.findIndex((genre) => genre == args.genre) !== -1
          )
        }
        return books
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, { currentUser }) => currentUser
    },
    Author: {
      bookCount: async (root) => {
       const books = await Book.find({}).populate('author')
       return books.filter(b => b.author.name === root.name).length
      }
    },
    Mutation:{
      addBook: async (root, args, {currentUser}) => {
        if(!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        const author = await Author.findOne({ name: args.author})
        if(!author) {
          const newAuthor = new Author({name: args.author, born: null})
          try{
            await newAuthor.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        const bookAuthor = await Author.findOne({ name: args.author })
        const newBook = new Book({...args, author: bookAuthor})
        try{
          await newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

        return newBook
      },
      editAuthor: async (root, args, {currentUser}) => {
        if(!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
  
        if (!args.name) {
          throw new UserInputError('No name field', {
            invalidArgs: args
          })
        }
  
        const author = await Author.findOne({ name: args.name})
        if(!author) {
          return null
        }
        author.born = args.setBornTo
        try{
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: async (root, args) => {
        if (!args.username || !args.favoriteGenre) {
          throw new UserInputError('username or favoriteGenre is missing', {
            invalidArgs: args
          })
        }
        const user = new User({...args})
        return user.save()
          .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        if (!args.username || !args.password) {
          throw new UserInputError('username or password is missing', {
            invalidArgs: args
          })
        }
        const user = await User.findOne({username: args.username})
  
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
      },
  }

  module.exports = resolvers

