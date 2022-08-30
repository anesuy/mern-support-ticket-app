const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {} = require ('../controllers/userController')


router.post('/', (req, res) => {
  res.send('Register Route')
})

router.post('/login', (req, res) => {
  res.send('Login Route')
})



module.exports = router
//how we export with the commom js sintaxe
