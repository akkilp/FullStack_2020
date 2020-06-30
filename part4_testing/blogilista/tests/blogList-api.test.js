const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)


  
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog =>  new Blog(blog))
  
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
  await User.deleteMany({})
    
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('two initialized blogs returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(2)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  
  const author = response.body.map(r => r.author)
  
  expect(author).toContain(
    'Edsger W. Dijkstra'
  )
})
  

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid new blog can be added ', async () => {
  const userInput = {
    username: 'Ahmankäpälä',
    name: 'Martti Liisa Yläjärvi',
    password: 'hurrikka'
  }
  
  await api
    .post('/api/users')
    .send(userInput)
  
  const logInCredentials = {
    username: userInput.username, 
    password: userInput.password
  }

  const logInUser = await api
    .post('/api/login')
    .send(logInCredentials)

  const newBlog = {
    author: 'Mikko Kuustonen',
    likes: 8,
    title: 'Kuinka ennustaa kristallipallosta - ilman käsiä.',
    url: 'https://www.uuden-ajan-avaruususkonto.gov',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${logInUser.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDB()
  
  const title = blogsAtEnd.map(b => b.title)
  
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain(
    'Kuinka ennustaa kristallipallosta - ilman käsiä.'
  )
})


test ('_id is succesfully transformed into id', async () => {
  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd[0].id).toBeDefined()
})

test ('if likes not defined => likes = 0', async () => {

  const userInput = {
    username: 'Ahmankäpälä',
    name: 'Martti Liisa Yläjärvi',
    password: 'hurrikka'
  }
  
  await api
    .post('/api/users')
    .send(userInput)
  
  const logInCredentials = {
    username: userInput.username, 
    password: userInput.password
  }

  const logInUser = await api
    .post('/api/login')
    .send(logInCredentials)

  const blogWithoutLikes = {
    title: 'Uskomattoman Maikin vielä villimmät avokadovinkit.',
    url: 'http://www.mv-lehti.com/ruoka_ja_hyvinvointi',
    author: 'Mike Smith',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${logInUser.body.token}`)
    .send(blogWithoutLikes)
    .expect(201)
    
  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd[2].likes).toBe(0)
})

test('post without title and/or url is rejected', async () => {
  const userInput = {
    username: 'Ahmankäpälä',
    name: 'Martti Liisa Yläjärvi',
    password: 'hurrikka'
  }
  
  await api
    .post('/api/users')
    .send(userInput)
  
  const logInCredentials = {
    username: userInput.username, 
    password: userInput.password
  }

  const logInUser = await api
    .post('/api/login')
    .send(logInCredentials)

  const newBlog = {
    author: 'Mikko Kuustonen',
    likes: 8,
    title: 'Kuinka ennustaa kristallipallosta - ilman käsiä.',
  }
    
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${logInUser.body.token}`)
    .send(newBlog)
    .expect(400)
    
  const blogsAtEnd = await helper.blogsInDB()
    
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('delete post works', async () => {

  const blogsAtStart = await helper.blogsInDB()

  const userInput = {
    username: 'Nurrikka',
    name: 'Narru Nurrikka',
    password: 'hurrikka'
  }
  
  await api
    .post('/api/users')
    .send(userInput)
  
  const logInCredentials = {
    username: userInput.username, 
    password: userInput.password
  }

  const logInUser = await api
    .post('/api/login')
    .send(logInCredentials)

  const newBlog = {
    author: 'Mikko Kuustonen',
    likes: 8,
    title: 'Kuinka ennustaa kristallipallosta - ilman käsiä.',
    url: 'www.onkhyl.com'
  }
    
  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${logInUser.body.token}`)
    .send(newBlog)
    
  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', `bearer ${logInUser.body.token}`)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('updating post works', async () => {
  const updatedData = {likes:100}

  const blogsAtStart = await helper.blogsInDB()
  const blogToUpdate = blogsAtStart[0]
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd[0].likes).toBe(100)
})

describe('when there is initially one user in db', () => {

    
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('creation returns with valid status code when username is taken', async() =>{
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: 'root',
      name: 'Rootjäbä',
      password: 'salainen',
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password is shorter than required lenght', async() =>{
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: 'root',
      name: 'Rootjäbä',
      password: 'sa',
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    console.log(result.text)
    expect(result.text).toContain(
      'Password must have more than 3 characters'
    )
    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username is shorter than required lenght', async() =>{
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: 'sh',
      name: 'Rootjäbä',
      password: 'salainen',
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})





afterAll(() => {
  mongoose.connection.close()
})