import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashbordState } from './interfaces';
import { Sale } from '../../core';

const initialState: DashbordState = {
  data: null,
};

const dashbordStore = createSlice({
  name: 'dashbord',
  initialState,
  reducers: {
    setSalesData: (state, action: PayloadAction<Sale[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setSalesData } = dashbordStore.actions;

export default dashbordStore.reducer;
