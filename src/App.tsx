import { FC, useEffect, useMemo } from 'react';
import SalesTable from 'components/Table';
import { DispatchType } from 'store/root';
import { useDispatch, useSelector } from 'react-redux';
import { generateMockSalesData, getFilteredData, sortSalesData } from 'core/functions';
import { setSalesData } from 'store/dashbord-service/reducer';
import LineChart from 'components/Chart';
import ProductComparison from 'components/ProductComprasion';
import {
  getFilterBySelector,
  getSalesDataSelector,
  getSortBySelector,
  getSortOrderSelector,
} from 'store/dashbord-service/selectors';
import PieChart from 'components/PieChart';

const App: FC = () => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    const salesData = generateMockSalesData();
    dispatch(setSalesData(salesData));
  }, []);

  const salesData = useSelector(getSalesDataSelector);
  const sortBy = useSelector(getSortBySelector);
  const sortOrder = useSelector(getSortOrderSelector);
  const filterBy = useSelector(getFilterBySelector);

  const sortedSalesData = useMemo(
    () => sortSalesData(salesData, sortBy, sortOrder),
    [salesData, sortBy, sortOrder]
  );

  const filteredSalesData = useMemo(
    () => getFilteredData(sortedSalesData, filterBy),
    [sortedSalesData, filterBy]
  );

  return (
    <div style={{ margin: '0 40px' }}>
      <SalesTable salesData={filteredSalesData} />
      <LineChart salesData={filteredSalesData} />
      <PieChart salesData={filteredSalesData} />
      <ProductComparison />
    </div>
  );
};

export default App;
