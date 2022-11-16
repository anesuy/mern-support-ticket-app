const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Tickets = require('../models/ticketModel')



//GET tickets
//route: api/tickets
//private
const getTickets = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const tickets = await Tickets.find({user: req.user.id})
  res.status(200).json(tickets)

})

//GET ticket
//route: api/tickets/:id
//private
const getTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const { id } = req.params; //or: const id = req.params.id
  const ticket = await Tickets.findById(id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  //only the ticket's user having access to it
  if (ticket.user.toString() !== req.user.id) {
    res.status(400)
    throw new Error('Not authorized')
  }
  res.status(200).json(ticket)

})

//DELETE ticket
//route: api/tickets/:id
//private
const deleteTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const { id } = req.params; //or: const id = req.params.id
  const ticket = await Tickets.findById(id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  //only the ticket's user having access to it
  if (ticket.user.toString() !== req.user.id) {
    res.status(400)
    throw new Error('Not authorized')
  }

  await Tickets.findByIdAndRemove(id)
  res.status(200).json({ message: "ticket deleted"})

})

//PUT ticket
//route: api/tickets/:id
//private
const updateTicket = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const { id } = req.params; //or: const id = req.params.id
  const ticket = await Tickets.findById(id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  //only the ticket's user having access to it
  if (ticket.user.toString() !== req.user.id) {
    res.status(400)
    throw new Error('Not authorized')
  }

  const updatedTicket = await Tickets.findByIdAndUpdate(id, req.body, { new: true})
  res.status(200).json(updatedTicket)

})


//POST ticket
//route: api/tickets
//private
const createTicket = asyncHandler(async (req, res) => {

  const {product, description} = req.body;
  if (!product || !description) {
    res.status(400)
    throw new Error('Please, add a product and description')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  const ticket = await Tickets.create({
    product: product, 
    description: description, 
    user: req.user.id,
    status: 'pending'

  })
  res.status(201).json(ticket)
})

module.exports ={
  getTickets, 
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket
}