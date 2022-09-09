import React, {useState} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
//userSelector = select from our global state
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '', 
    password: '',
    password2: ''
  })

  const { name, email, password, password2} = form;

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setForm((prevState) => (
      {
      ...prevState,
      [e.target.name]: [e.target.value]
      }
    ))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2){
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name: name, 
        email: email, 
        password: password,
      }
      dispatch(register(userData))
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/> Register {user}
        </h1>
        <p> Please create an account </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className="form-group">
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className="form-group">
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className="form-group">
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your password'
              required
            />
          </div>
          <div className='form-group'>
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}