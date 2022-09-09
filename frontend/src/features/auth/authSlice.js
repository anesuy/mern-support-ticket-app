import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isSuccesss: false,
  isLoading: false,
  message: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {

})

export default authSlice.reducer;