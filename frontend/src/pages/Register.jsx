import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '', 
    password: '',
    password2: ''
  })

  const { name, email, password, password2} = form;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth)

  const onChange = (e) => {
    const {name, value} = e.target;
    setForm((prevState) => (
      {
      ...prevState,
      [name]: value,
      }
    ))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (password!== password2){
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name: name, 
        email: email, 
        password: password,
      }
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          let { name } = user;
          toast.success(`Registered new user - ${name}`);
          navigate('/');
        })
        .catch(toast.error);
    }
  }

  if (isLoading) {
    return (
      <Spinner/>
    )
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/> Register
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
