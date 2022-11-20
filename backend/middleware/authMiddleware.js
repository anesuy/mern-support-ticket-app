const jwb = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        //Get token from header
        token = req.headers.authorization.split(' ')[1]

        //Verify token
       const decoded = jwb.verify(token, process.env.JSONWEBSECRET)
       
      //Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      //checking i the user was found
        if (!req.user) {
          res.status(401)
          throw new Error('Not authorized')
        }
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error ('Not authorized')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized')
    }
})

module.exports = {protect};