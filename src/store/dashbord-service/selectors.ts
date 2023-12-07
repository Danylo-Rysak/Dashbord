import { StoreType } from '../root';

export const getSalesDataSelector = (state: StoreType) => state.dashbordStore.data;
