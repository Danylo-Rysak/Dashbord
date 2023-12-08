import { FC, useMemo } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterBySelector,
  getSalesDataSelector,
  getSortBySelector,
  getSortOrderSelector,
} from 'store/dashbord-service/selectors';
import { DispatchType } from 'store/root';
import { getFilteredData, sortSalesData } from 'core/functions';
import {
  setFilterByCategory,
  setSortBy,
  setSortOrder,
} from 'store/dashbord-service/reducer';
import SortableCell from './SortableCell';
import styles from './index.module.css';

const CATEGORY_FILTER_LABEL_ID = 'category-filter-label';

const SalesTable: FC = () => {
  const dispatch: DispatchType = useDispatch();

  const salesData = useSelector(getSalesDataSelector);
  const sortBy = useSelector(getSortBySelector);
  const sortOrder = useSelector(getSortOrderSelector);
  const filterBy = useSelector(getFilterBySelector);

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

  const sortedSalesData = useMemo(
    () => sortSalesData(salesData, sortBy, sortOrder),
    [salesData, sortBy, sortOrder]
  );

  const filteredSalesData = useMemo(
    () => getFilteredData(sortedSalesData, filterBy),
    [sortedSalesData, filterBy]
  );

  return (
    <div className={styles.tableContainer}>
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
            {filteredSalesData.map((sale) => (
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
