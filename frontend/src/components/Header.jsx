import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {toast} from 'react-toastify'

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    .unwrap()
        .then(() => {
          toast.success(`Logged out`);
          navigate('/');
        })
        .catch(toast.error);
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to='/'> Support Desk </Link>
      </div>
      <ul>
        {!!user ? (
          <li>
            <button 
              className='btn' 
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to ='/login'>
                <FaSignInAlt/> Login
              </Link>
            </li>
            <li>
              <Link to ='/register'>
                <FaUser/> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
