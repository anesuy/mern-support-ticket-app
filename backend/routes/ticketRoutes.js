const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { 
  getTickets, 
  getTicket, 
  createTicket, 
  deleteTicket,
  updateTicket
} = require('../controllers/ticketsController')

router.route('/')
  .post(protect, createTicket)
  .get(protect, getTickets)

router.route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router;