const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const { registerUser, loginUser , getMe} = require ('../controllers/userController')
const {protect} = ('../middleware/authMiddleare')

//withour the userController file 

//router.post('/', (req, res) => {
//  res.send('Register Route')
//})

//router.post('/login', (req, res) => {
//  res.send('Login Route')
//})

//with userController file:

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router;
//how we export with the commom js sintaxe
