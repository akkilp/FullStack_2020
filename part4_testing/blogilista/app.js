const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/routes')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    logger.info('Connected to database')
  })
  .catch(()=>{
    logger.error('Unable to connect database')
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

module.exports = app
