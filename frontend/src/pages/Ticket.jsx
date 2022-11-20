import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, deleteNote } from '../features/notes/notesSlice'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import ModalItem from '../components/ticketModal'
import NoteItem from '../components/NotesItem'

function Ticket() {

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { notes } = useSelector((state) => state.notes)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { ticket } = location.state
  const { id } = useParams()
  
  useEffect(() => {
    dispatch(getTicket(id)).unwrap().catch(toast.error)
    dispatch(getNotes(id)).unwrap().catch(toast.error)
    if(!ticket){
      setLoading(true)
    }
    setLoading(false)
  }, [id, dispatch, ticket])

  const onTicketClose = () => {
    dispatch(closeTicket(id))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        navigate('/tickets')
      })
      .catch(toast.error)
  }

  const deleteNoteFunction = (idNote) => {
    dispatch(deleteNote({idNote, id}))
    .unwrap()
    .then(() => {
      toast.success('Note deleted')
      dispatch(getNotes(id)).unwrap().catch(toast.error)
    })
    .catch(toast.error)
  }
  const handleModal = () => setShowModal(!showModal)

  return (
    <>
      {loading && <Spinner />}
      {!loading && 
        <div className='ticket-page'>
        <header className='ticket-header'>
          <BackButton url='/tickets'/>
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className='ticket-desc'>
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>
        {ticket.status !== 'closed' && (
          <button onClick={handleModal } className='btn'>
            <FaPlus /> Add Note
          </button>
        )}
        <ModalItem
          showModal={showModal}
          handleModal={handleModal}
          id={id}
        ></ModalItem>
        {notes && notes[0] !== undefined && (
          notes.map((note) => <NoteItem key={note._id} note={note} deleteNote={deleteNoteFunction}/>)
        )}
        {ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className='btn btn-block btn-danger'>
            Close Ticket
          </button>
        )}
      </div>
    }
    </>
  )
}

export default Ticket