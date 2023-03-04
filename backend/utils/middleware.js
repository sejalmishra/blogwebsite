const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }else {
    req.token = null;
  }
  next();
}

const userExtractor = async (req, res, next) => {
  try{
    const decodedToken = jwt.verify(req.token, config.SECRET)
    if(!decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  if(user){
  request.user = user;
  }
  }catch(error){
    next(error);
  }
  next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {

    if(error.name === 'CastError'){
        return res.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}