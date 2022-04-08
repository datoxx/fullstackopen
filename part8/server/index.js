const { 
  ApolloServer,
  UserInputError,
  AuthenticationError, 
  gql 
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')


const JWT_SECRET = 'SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://fso-part3:fso-part3@fullstack.sqve7.mongodb.net/part8?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  } 
`

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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findOne({ username: decodeToken.username })
      return { currentUser }
    }  
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
