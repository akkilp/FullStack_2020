const Book = require('../models/Book')
const Author = require('../models/author')

const initializeDB = async () => {
  await Book.deleteMany({})
  await Author.deleteMany({})

  const authorObjects = authors.map(author => new Author({
    name: author.name,
    bookCount: 0,
    born: author.born ? author.born : null
  }))

  const bookObjects = books.map(book => {
    let targetBook = authorObjects.find(author => author.name === book.author)
    return new Book({
    title: book.title,
    published: book.published,
    genres: book.genres,
    author: targetBook._id
  })
})
  
  const bookPromises = bookObjects.map(book =>  
    book.save()
  )

  const authorPromises = authorObjects.map(author => {
    bookObjects.map(book => { 
      if(book.author===author._id) {
        author.bookCount++;
        author.books.push(book._id) 
      }
    })
  
    author.save()
    }
  )
  await Promise.all(bookPromises)
  await Promise.all(authorPromises)

  // console.log( await Book.find({}).populate('author', {name: 1, born: 1}))
  // console.log(await Author.find({}).populate('books',{title: 1, published: 1}))
}

const authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]

  const books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]

module.exports = { initializeDB }