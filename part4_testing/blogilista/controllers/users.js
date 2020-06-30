const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1, id:1})
  response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response) =>{
  const body = request.body
  const validPassword = body.password.length>3
    ? true
    : false
  if(!validPassword) return response.status(400).send({err: 'Password must have more than 3 characters'})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()
  response.status(200).json(savedUser)
})

module.exports = userRouter