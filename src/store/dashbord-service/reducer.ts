import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashbordState } from './interfaces';
import { Sale } from 'core/types';

const initialState: DashbordState = {
  data: [],
  sortBy: 'revenue',
  sortOrder: 'asc',
};

const dashbordStore = createSlice({
  name: 'dashbord',
  initialState,
  reducers: {
    setSalesData: (state, action: PayloadAction<Sale[]>) => {
      state.data = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<'revenue' | 'unitsSold' | 'profitMargin'>
    ) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setSalesData, setSortBy, setSortOrder } = dashbordStore.actions;

export default dashbordStore.reducer;
