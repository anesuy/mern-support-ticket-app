const express = require("express")
const colors = require("colors")
const cors = require('cors')
const dotenv = require("dotenv").config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

const app = express()

//connect to database
connectDB()

//translating data
app.use(express.json()) //used to happen using body-parser, but now express has this functionality
app.use(express.urlencoded({extended: false}))

//APP GET
app.get('/', (req, res) => {
  res.status(200).json({message:'Hello'});
  //res.send()
})

app.use(cors())

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

