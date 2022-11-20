const asyncHandler = require('express-async-handler')
const Note = require('../models/notesModel')
const Ticket = require('../models/ticketModel')


//@descrição  GET 
//@rota   api/tickers/:id/notes
//@acesso  Private
const getNotes = asyncHandler(async (req, res) => {
  var { id } = req.params
  const ticket = await Ticket.findById(id)

  var idFromUser = req.user.id 
  if(ticket.user.toString() !== idFromUser){
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find(
    {
      ticket: id
    }
   )
   res.status(200).json(notes)
})

//@descrição  POST
//@rota   api/tickers/:id/notes
//@acesso  Private
const addNote = asyncHandler(async (req, res) => {
  var { id } = req.params
  const ticket = await Ticket.findById(id)

  var idFromUser = req.user.id 
  if(ticket.user.toString() !== idFromUser){
    res.status(401)
    throw new Error('User not authorized')
  }
  
  const note = await Note.create(
    {
      ticket: id,
      text: req.body.text,
      user: idFromUser,
      isStaff: false
    }
   )
   res.status(201).json(note) 
})

const deleteNote = asyncHandler(async(req, res) => {
  var { id, idNote } = req.params
  

  const ticket = await Ticket.findById(id)
  const note = await Note.findById(idNote)
  
  var idFromUser = req.user.id 
  if(ticket.user.toString() !== idFromUser){
    res.status(401)
    throw new Error('User not authorized')
  }
  
  if (!note) {
    res.status(401)
    throw new Error('Note not found!')
  }

  const deletedNote = await Note.findByIdAndDelete(idNote)
  res.status(200).json(deletedNote)
  
})

module.exports = {
  getNotes, 
  addNote,
  deleteNote
}

