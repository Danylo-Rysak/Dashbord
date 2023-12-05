import { configureStore } from '@reduxjs/toolkit';
import dashbordStore from 'store/dashbord-service/reducer';

const store = configureStore({
  reducer: {
    dashbordStore,
  },
});

// Global store type
export type StoreType = ReturnType<typeof store.getState>;

// Dispatch type
export type DispatchType = typeof store.dispatch;

export default store;
