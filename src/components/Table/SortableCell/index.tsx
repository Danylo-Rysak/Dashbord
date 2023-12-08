import { FC } from 'react';
import { TableCell } from '@mui/material';
import arrowUp from 'assets/icons/arrow-up.svg';
import arrowDown from 'assets/icons/arrow-down.svg';
import styles from './index.module.css';

interface SortableCellProps {
  column: 'revenue' | 'unitsSold' | 'profitMargin';
  label: string;
  handleSort: (
    column: 'revenue' | 'unitsSold' | 'profitMargin',
    order: 'asc' | 'desc'
  ) => void;
}

const SortableCell: FC<SortableCellProps> = ({ column, label, handleSort }) => {
  return (
    <TableCell align="center">
      <div className={styles.cell}>
        <img
          className={styles.icon}
          src={arrowUp}
          alt="arrow-up"
          onClick={() => handleSort(column, 'desc')}
        />
        <b>{label}</b>
        <img
          className={styles.icon}
          src={arrowDown}
          alt="arrow-down"
          onClick={() => handleSort(column, 'asc')}
        />
      </div>
    </TableCell>
  );
};

export default SortableCell;
