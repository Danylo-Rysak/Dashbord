import { FC, useEffect } from 'react';
import SalesTable from 'components/Table';
import { DispatchType } from 'store/root';
import { useDispatch } from 'react-redux';
import { generateMockSalesData } from 'core/functions';
import { setSalesData } from 'store/dashbord-service/reducer';

const App: FC = () => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    const salesData = generateMockSalesData();
    dispatch(setSalesData(salesData));
  }, []);

  return (
    <div>
      <SalesTable />
    </div>
  );
};

export default App;
