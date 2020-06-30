const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => 
{
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs.map(note => note.toJSON()))
})

blogRouter.post('/', async(request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    author: body.author,
    user:user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())


})

blogRouter.delete('/:id', async(request, response) => {  
  const targetBlog = await Blog.findById(request.params.id)
  const blogCreator = targetBlog.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const requestInitiator = await User.findById(decodedToken.id)

  if(blogCreator.toString()!==requestInitiator._id.toString()){
    response.status(401).json({error: 'Unauthorized token: not creator of the blog'})
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).end()
})

blogRouter.put('/:id', async(request, response) => {  
  const body = request.body
  const updatedData = {
    likes: body.likes,
  }
  
  await Blog.findByIdAndUpdate(request.params.id, updatedData, {new: true})
  response.status(200).end()
})


module.exports = blogRouter