import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notesService from './notesService'

const initialState = {
  notes: []
}

export const notesSlice = createSlice({
  name: 'note',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.notes = null
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  }
})

export default notesSlice.reducer

export const getNotes = createAsyncThunk('notes/getAll', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.getNotes(id, token)
  }
  catch(error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const createNote = createAsyncThunk('notes/create', async({noteText, id}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.createNote(noteText, id, token)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const deleteNote = createAsyncThunk('note/delete', async({idNote, id}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await notesService.deleteNote(idNote, id, token)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
