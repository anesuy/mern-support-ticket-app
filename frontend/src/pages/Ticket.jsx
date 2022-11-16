import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { tickets } = useSelector((state) => state.tickets)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { ticketId } = useParams()
  const { ticket } = location.state
  
  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
  
  }, [ticketId, dispatch])


  const openCloseModal = () => setModalIsOpen(!modalIsOpen)
  
  if (!ticket) {
    return <Spinner />
  }

  return (
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
        <button onClick={openCloseModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

    </div>

  )
}

export default Ticket