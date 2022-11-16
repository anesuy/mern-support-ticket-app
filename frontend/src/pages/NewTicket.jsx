import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createTicket } from '../features/tickets/ticketSlice'
import { useNavigate}  from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = useRef(user.name)
  const email = useRef(user.email)

  const [product, setProduct] = useState('') 
  const [description, setDescription] = useState('')  

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createTicket({product, description}))
      .unwrap()
        .then(() => {
          navigate('/tickets')
          toast.success('New ticket created!')
        })
        .catch(toast.error)
  }
  
  return (
    <>
      <BackButton url='/'></BackButton>
      <section className='heading'>
        <h1> Create New Ticket </h1>
        <p> Please fill out the form below </p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">
            Customer Name
          </label>
          <input 
            type="text" 
            className="form-control" 
            value={name.current} 
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Customer Email
          </label>
          <input 
            type="text" 
            className="form-control" 
            value={email.current} 
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product"/>
          <select 
            name="product" 
            id="product" 
            value={product} 
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value='iPhone'>iPhone</option>
            <option value='iPad'>iPad</option>
            <option value='Macbook'>Macbook</option>
            <option value='iWatch'>iWatch</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description"/>
          <textarea 
            name="description" 
            id="description" 
            value={description}
            className='form-control'
            placeholder='Add a description'
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>
        <div className="form-group">
          <button className='btn btn-block'>
            Submit
          </button>
        </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket