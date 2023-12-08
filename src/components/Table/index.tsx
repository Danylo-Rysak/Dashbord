import { FC } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { DispatchType } from 'store/root';
import {
  setFilterByCategory,
  setSortBy,
  setSortOrder,
} from 'store/dashbord-service/reducer';
import SortableCell from './SortableCell';
import styles from './index.module.css';
import { Sale } from '../../core/types';

const CATEGORY_FILTER_LABEL_ID = 'category-filter-label';

interface SalesTableProps {
  salesData: Array<Sale>;
}

const SalesTable: FC<SalesTableProps> = ({ salesData }) => {
  const dispatch: DispatchType = useDispatch();

  const handleSort = (
    column: 'revenue' | 'unitsSold' | 'profitMargin',
    order: 'asc' | 'desc'
  ) => {
    dispatch(setSortBy(column));
    dispatch(setSortOrder(order));
  };

  const handleFilter = (category: string) => {
    dispatch(setFilterByCategory(category));
  };

  return (
    <div>
      <div className={styles.tableActions}>
        <FormControl className={styles.tableFilter}>
          <InputLabel id={CATEGORY_FILTER_LABEL_ID}>Filter by Category</InputLabel>
          <Select
            label="Filter by Category"
            labelId={CATEGORY_FILTER_LABEL_ID}
            onChange={(e) => handleFilter(e.target.value as string)}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Home Appliances">Home Appliances</MenuItem>
          </Select>
        </FormControl>

        <CSVLink data={salesData} filename={'sales_data.csv'}>
          <Button variant="outlined">Download CSV</Button>
        </CSVLink>
      </div>

      <Paper>
        <Table>
          <TableHead>
            <TableRow className={styles.tableRow}>
              <TableCell>
                <b>Product Name</b>
              </TableCell>
              <SortableCell column="revenue" label="Revenue" handleSort={handleSort} />
              <SortableCell
                column="unitsSold"
                label="Units Sold"
                handleSort={handleSort}
              />
              <SortableCell
                column="profitMargin"
                label="Profit Margin"
                handleSort={handleSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.productId}>
                <TableCell>{sale.productName}</TableCell>
                <TableCell align="center">{sale.revenue}</TableCell>
                <TableCell align="center">{sale.unitsSold}</TableCell>
                <TableCell align="center">{sale.profitMargin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default SalesTable;
