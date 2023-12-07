import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchType } from 'store/root';
import { setSalesData } from 'store/dashbord-service/reducer';
import { generateMockSalesData } from 'core/functions';
import Table from 'components/Table';

const App: FC = () => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    const salesData = generateMockSalesData();
    dispatch(setSalesData(salesData));
  }, []);

  return (
    <div>
      <Table />
    </div>
  );
};

export default App;
