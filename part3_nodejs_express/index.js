require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/models.js')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('tiny'))


morgan.token('body', function (req) {
  return JSON.stringify({ name: req.body.name, number: req.body.number })
})

const generateId = () => {
  return Math.round(Math.random()*100000)
}

// app.get('/info', (req,res) =>{
//   res.send(`Phonebook has info for ${persons.length} people. <br/>${Date()}`)
// })

app.get('/api/persons', (req,res,next) => {
  Person.find({}).then(people => {
    res.json(people)
  }).catch(error => next(error))
})


app.get('/api/persons/:id', (req, res,next) => {
  Person.findById(req.params.id).then(person => {
    person
      ? res.json(person.toJSON())
      : res.status(404).end
  }).catch(error => next(error))
})

app.post('/api/persons', morgan(':body'), (req, res, next) => {
  const newPerson = req.body
  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
    date: new Date(),
    id: generateId(),
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson.toJSON())
    }).catch(err => {next(err)})
})

app.put('/api/persons/:id', (req,res,next) => {
  const updatedPerson = req.body
  const newNumber = {
    number: updatedPerson.number,
  }
  Person.findByIdAndUpdate(req.params.id, newNumber, { new: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      res.json(updatedPerson)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  let msg
  if (error.name === 'CastError') {
    msg = 'Invalid ID'
    return response.status(400).send({ error: msg })
  } else if (error.name === 'ValidationError') {
    msg = error.message
    return response.status(400).json({ error: msg })
  } else response.status(400).json({ error: error.message })
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running')
})