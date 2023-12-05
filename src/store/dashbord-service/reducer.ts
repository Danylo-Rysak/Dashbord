import { createSlice } from '@reduxjs/toolkit';
// Interfaces
import { DashbordState } from './interfaces';

const initialState: DashbordState = {};

const dashbordStore = createSlice({
  name: 'dashbord',
  initialState,
  reducers: {},
});

export const {} = dashbordStore.actions;

export default dashbordStore.reducer;
