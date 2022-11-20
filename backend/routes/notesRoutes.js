const express = require('express')
const router = express.Router({ mergeParams: true })
const { protect } = require('../middleware/authMiddleware')
const { getNotes, addNote, deleteNote } = require('../controllers/notesController')


router.route('/')
  .get(protect, getNotes)
  .post(protect, addNote)

router.route('/:idNote')
  .delete(protect, deleteNote)

module.exports = router
