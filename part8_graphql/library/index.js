const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/author')
const User = require('./models/user')



const {initializeDB} = require('./helper/seedData')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://rotikka:en1kerro@cluster0-qfagl.mongodb.net/Library_test?retryWrites=true&w=majority'

const JWT_SECRET = 'SECRET'

mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(async()=> {
    console.log('Connection found with MONGO')
    await initializeDB()
  })
  .catch((error) => {
    console.log('unable to connect MONGODB: ', error.message)
  })

const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String, author: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    addAuthor(
      name: String!
      bookCount: Int
      born: Int
    ): Author

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

  type Subscription {
    bookAdded: Book!
  }
`

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.genre && !args.author) return await Book.find({}).populate('author')

      if(args.genre){
        const filteredByGenre = await Book.find({genres: {$in: [args.genre]}}).populate('author')
        return filteredByGenre
      } 
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }  
  },

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try{
        const targetAuthor = await Author.find({name: args.author})
        const targetId = targetAuthor[0]._id
        const book = new Book({...args, author: targetId})
        const updatedAuthor = {...targetAuthor, bookCount: targetAuthor[0].bookCount+1,books: [...targetAuthor[0].books, book]}
        await Author.findOneAndUpdate({_id: targetId}, updatedAuthor)
        await book.save()
        const populatedBook = await book.populate('author').execPopulate()
        pubsub.publish(['BOOK_ADDED'], { bookAdded: populatedBook })
        return populatedBook 
      } catch(err){
          throw new UserInputError(err.message,{invalidArgs: args})
      }

      },
    addAuthor: async (root, args, context) => {
      const author = new Author({
        name: args.name,
        bookCount: await Book.countDocuments({name:{$exists: args.name}}),
        born: args.born ? args.born : null
      })
      try{
        author.save()
      } catch(err){
        throw new UserInputError(err.message,{invalidArgs: args})
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try{
        const findAuthor = await Author.find({name: args.name})
        const targetAuthor = findAuthor[0]
        if(!findAuthor[0]) return null
        const editedAuthor = {
          name: targetAuthor.name, 
          _id:targetAuthor.id, 
          books:targetAuthor.books, 
          born: args.setBornTo
        } 
        const updatedAuthor = await Author.findOneAndUpdate({_id: targetAuthor._id}, editedAuthor, ({ runValidators: true , new: true}))
        return updatedAuthor
      } catch(err){
        throw new UserInputError(err.message,{invalidArgs: args})
      }
    },
    createUser: (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs:args
          })
        })
    },

    login: async(root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user || args.password !== 'secret'){
        throw new UserInputError('Invalid credentials')
      } 
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        return pubsub.asyncIterator('BOOK_ADDED')
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')

      return { currentUser }
    }
  }  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Server ready at ${subscriptionsUrl}`)
})



// Code for tasks before the DB
/*       let filtered = books
        
        if(args.genre){
          const byGenre = (book) => book.genres.find(
            genre=>genre.toLowerCase().includes(args.genre.toLowerCase())) 
              ? book 
              : !book
          filtered = filtered.filter(byGenre)
        } 
        if(args.author){
          const byAuthor = (book) => book.author.toLowerCase().includes(args.author.toLowerCase())
          filtered = filtered.filter(byAuthor)
        }
        return filtered */

        /* const countAuthors = (total, current) => {
  let unique = !total.find(item => item===current.author)
  return unique ? total.concat(current.author) : total
}

// Using reduce to count number of books based on the books-array
const uniqueAuthors = books.reduce(countAuthors,[])

const authorAndBookCount = uniqueAuthors.map((author) => {
  const bookCount = books.reduce((total, current)=>{
    return current.author===author ? total+1 : total
  },0)
  const born = authors.find(a => a.name===author)
  return {name: author, bookCount: bookCount, born: born&&born.born ? born.born : null}
})
 */