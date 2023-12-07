import { Sale } from 'core/types';

export interface DashbordState {
  data: Array<Sale>;
  sortBy: 'revenue' | 'unitsSold' | 'profitMargin';
  sortOrder: 'asc' | 'desc';
  filterByCategory: string | null;
}
