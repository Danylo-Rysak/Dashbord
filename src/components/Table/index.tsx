// SalesTableMui.tsx
import { FC } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { getSalesDataSelector } from 'store/dashbord-service/selectors';

const SalesTableMui: FC = () => {
  const salesData = useSelector(getSalesDataSelector);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Units Sold</TableCell>
            <TableCell align="right">Profit Margin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData?.map((sale) => (
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
  );
};

export default SalesTableMui;
