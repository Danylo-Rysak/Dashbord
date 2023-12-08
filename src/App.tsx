import { FC, useEffect } from 'react';
import SalesTable from 'components/Table';
import { DispatchType } from 'store/root';
import { useDispatch, useSelector } from 'react-redux';
import { generateMockSalesData } from 'core/functions';
import { setSalesData } from 'store/dashbord-service/reducer';
import LineChart from 'components/Chart';
import ProductComparison from 'components/ProductComprasion';
import { getSalesDataSelector } from 'store/dashbord-service/selectors';
import PieChart from 'components/PieChart';

const App: FC = () => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    const salesData = generateMockSalesData();
    dispatch(setSalesData(salesData));
  }, []);

  const salesData = useSelector(getSalesDataSelector);

  return (
    <div style={{ margin: '0 40px' }}>
      <SalesTable />
      <LineChart salesData={salesData} />
      <PieChart salesData={salesData} />
      <ProductComparison />
    </div>
  );
};

export default App;
