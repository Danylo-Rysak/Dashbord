import { FC, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilterBySelector,
  getSalesDataSelector,
  getSortBySelector,
  getSortOrderSelector,
} from 'store/dashbord-service/selectors';
import { DispatchType } from 'store/root';
import { generateMockSalesData, getFilteredData, sortSalesData } from 'core/functions';
import {
  setFilterByCategory,
  setSalesData,
  setSortBy,
  setSortOrder,
} from 'store/dashbord-service/reducer';
import arrowUp from 'assets/icons/arrow-up.svg';
import arrowDown from 'assets/icons/arrow-down.svg';

const SalesTable: FC = () => {
  const dispatch: DispatchType = useDispatch();

  const salesData = useSelector(getSalesDataSelector);
  const sortBy = useSelector(getSortBySelector);
  const sortOrder = useSelector(getSortOrderSelector);
  const filterBy = useSelector(getFilterBySelector);

  useEffect(() => {
    const salesData = generateMockSalesData();
    dispatch(setSalesData(salesData));
  }, []);

  const handleSort =
    (column: 'revenue' | 'unitsSold' | 'profitMargin', order: 'asc' | 'desc') => () => {
      dispatch(setSortBy(column));
      dispatch(setSortOrder(order));
    };

  const handleFilter = (category: string) => {
    dispatch(setFilterByCategory(category));
  };

  const sortedSalesData = sortSalesData(salesData, sortBy, sortOrder);

  const filteredSalesData = getFilteredData(sortedSalesData, filterBy);

  return (
    <div>
      <label>Filter by Category:</label>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home Appliances">Home Appliances</option>
      </select>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">
                <img
                  src={arrowUp}
                  alt="arrow-up"
                  onClick={handleSort('revenue', 'desc')}
                />
                <b>Revenue</b>
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  onClick={handleSort('revenue', 'asc')}
                />
              </TableCell>
              <TableCell align="right">
                <img
                  src={arrowUp}
                  alt="arrow-up"
                  onClick={handleSort('unitsSold', 'desc')}
                />
                <b>Units Sold</b>
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  onClick={handleSort('unitsSold', 'asc')}
                />
              </TableCell>
              <TableCell align="right">
                <img
                  src={arrowUp}
                  alt="arrow-up"
                  onClick={handleSort('profitMargin', 'desc')}
                />
                <b>Profit Margin</b>
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  onClick={handleSort('profitMargin', 'asc')}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalesData.map((sale) => (
              <TableRow key={sale.productId}>
                <TableCell>{sale.productName}</TableCell>
                <TableCell align="right">{sale.revenue}</TableCell>
                <TableCell align="right">{sale.unitsSold}</TableCell>
                <TableCell align="right">{sale.profitMargin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default SalesTable;
