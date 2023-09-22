import { createSlice, configureStore } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken: (state, action) => action.payload,
    clearToken: state => null
  }
})

export const { setToken, clearToken } = tokenSlice.actions

const store = configureStore({
  reducer: {
    token: tokenSlice.reducer
  }
})

export default store
