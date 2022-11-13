import React, {useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function Login() {
  const [form, setForm] = useState({
    name: '',
    email: '', 
    password: '',
    password2: ''
  })
  const { name, email, password, password2} = form
  const navigate = useNavigate();
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
    const userData = {
      email: email[0],
      password: password[0],
    }
    dispatch(login(userData))
    .unwrap()
        .then((user) => {
          let { name } = user;
          toast.success(`Logged in as ${name}`);
          navigate('/');
        })
        .catch(toast.error);
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
          <FaSignInAlt/> Login
        </h1>
        <p> Please login to get support </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
          <div className='form-group'>
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
