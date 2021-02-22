import { createSlice } from '@reduxjs/toolkit';

export const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState: false,
  reducers: {
    setAuthenticated: (state) => (state = true),
    clearSession: (state) => (state = false),
  },
});

export const { setAuthenticated, clearSession } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
