import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tickets'

const create = async (ticket, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, ticket, config)
  return response.data
}

const getTickets = async (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getTicket = async (ticketId, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  let url = API_URL + "/" + ticketId
  const response = await axios.get(url, config)
  return response.data
}

const ticketService = {
  create,
  getTickets,
  getTicket
  
}

export default ticketService;