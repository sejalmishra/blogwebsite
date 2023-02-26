const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async( req, res, next) => {
  const {username, name, password} = req.body;
})