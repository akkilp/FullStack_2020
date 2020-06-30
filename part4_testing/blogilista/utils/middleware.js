const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Token:  ', request.token)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  logger.info(err)
  console.log(err.name)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return response.status(400).send({ error: 'ID you tried to reach does not exist' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  }
  next()
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  next()
}


module.exports = {requestLogger, errorHandler, unknownEndpoint,tokenExtractor}