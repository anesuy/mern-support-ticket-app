import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets : [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTickets.pending, (state) => {
      state.ticket = null
    })
    .addCase(getTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
    })
    .addCase(getTicket.fulfilled, (state, action) => {
      state.ticket = action.payload
    })
    .addCase(closeTicket.fulfilled, (state, action) => {
      state.ticket = action.payload
      state.tickets = state.tickets.map((ticket) =>
        ticket._id === action.payload._id ? action.payload : ticket
      )
    })
  }
})

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer

export const createTicket = createAsyncThunk('tickets/create', async (ticket, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.create(ticket, token)
  } 
  catch (error) {
    return thunkAPI.rejectWithValue(error.toString())

  }
})

export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTickets(token)
  } 
  catch (error) {
    return thunkAPI.rejectWithValue(error.toString())
  }
  
})

export const getTicket = createAsyncThunk('tickets/getTicket', async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTicket(ticketId, token)
  } 
  catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
  
})

export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)