const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/userModel');

//@description = register a new user
//@route /api/routes
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  
  //validation 
  if (!name || !email || !password ){
    //return res.status(400).json({message:'Please, include all fields'})
    // OR -> error handler
    res.status(400)
    throw new Error('Please, include all fields') //this return an HTML file, go to: middleware 
  }
  //now if the field are there, what happens..
  //Find if user already exists
  const userExists = await User.findOne({email: email})
    if(userExists) {
      res.status(400)
      throw new Error ('User already exists')
    }
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  //Create user
  const user = await User.create({
    name: name,
    email: email, 
    password: hashedPassword
  })
    
    if (user) {
      res.status(201).json({
        _id: user._id, 
        name: user.name, 
        email: user.email,
        token: resToken(user._id)
      })
    } else {
      res.status(400) 
      throw new Error('Invalid user data')
    }
})

//@description            = login a user
//@route                  /api/users/login
//@access                 Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({email})
    //check user and password match
    if (user && (await bcrypt.compare(password, user.password))){
      res.status(200).json({
        _id: user._id, 
        name: user.name,
        email: user.email,
        token: resToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error ('Invalid credentials!')
    }

  //res.send('Login Route') npt needed anymore
})

//@generateToken
const resToken = (id) => {
  return jsonwebtoken.sign({id}, process.env.JSONWEBSECRET, {
    expiresIn: '30d'
    //30days
  }) 
}

//@description = Get current user
//@route /api/users/me
//@access Public
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user_id, 
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

module.exports = {
  registerUser, 
  loginUser,
  getMe
}

//handle adding data to the body to send to the register|login routes

//mongoose returns a promise
//async await 
//or
//.then syntax
// if you don't use the async handler you have to use the .catch, or if you're using a async wait you'd use a try catch block 
// asyncHandler conects with errorHandler