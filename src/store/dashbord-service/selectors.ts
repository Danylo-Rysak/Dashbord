import { StoreType } from '../root';

export const getSalesDataSelector = (state: StoreType) => state.dashbordStore.data;

export const getSortBySelector = (state: StoreType) => state.dashbordStore.sortBy;

export const getSortOrderSelector = (state: StoreType) => state.dashbordStore.sortOrder;
