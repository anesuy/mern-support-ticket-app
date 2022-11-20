import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTicket from './pages/NewTicket'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route 
              path='/new-ticket' 
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            >
            </Route>
            <Route 
              path='/tickets' 
              element={
                <PrivateRoute>
                  <Tickets />
                </PrivateRoute>
              }
            >
            </Route>
            <Route 
              path='/tickets/:id' 
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            >
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
