const asyncHandler = require('express-async-handler')

//@description = register a new user
//@route /api/routes
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  //validation 
  if (!name || !email || password ){
    //return res.status(400).json({message:'Please, include all fields'})
    // OR -> error handler
    res.status(400)
    throw new Error('Please, include all fields') //this return an HTML file, go to: middleware 
  }
  res.send('Register Route')
})

//@description = login a user
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser, 
  loginUser,
}

//handle adding data to the body to send to the register|login routes

//mongoose returns a promise
//async await 
//or
//.then syntax
// if you don't use the async handler you have to use the .catch, or if you're using a async wait you'd use a try catch block 
// asyncHandler conects with errorHandler