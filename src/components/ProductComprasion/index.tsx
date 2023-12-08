import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, List, ListItem, ListItemText } from '@mui/material';
import { Chart } from 'chart.js';
import { getSalesDataSelector } from 'store/dashbord-service/selectors';
import { Sale } from 'core/types';
import styles from './index.module.css';

const MAX_SELECTED_PRODUCTS = 4;

const ProductComparison: FC = () => {
  const salesData = useSelector(getSalesDataSelector);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prevSelection) => {
      if (prevSelection.includes(productId)) {
        return prevSelection.filter((id) => id !== productId);
      } else {
        if (prevSelection.length < MAX_SELECTED_PRODUCTS) {
          return [...prevSelection, productId];
        }
        return prevSelection;
      }
    });
  };

  const selectedSalesData: Array<Sale> = salesData.filter((sale) =>
    selectedProducts.includes(sale.productId)
  );

  const createChart = (
    data: number[],
    labels: string[],
    chartType: 'bar' | 'line' | 'pie',
    canvasId: string
  ) => {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement | null;

    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Comparison',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  const createCharts = () => {
    const labels = selectedSalesData.map((sale) => sale.productName);
    const revenueData = selectedSalesData.map((sale) => sale.revenue);
    const unitsSoldData = selectedSalesData.map((sale) => sale.unitsSold);
    const profitMarginData = selectedSalesData.map(
      (sale) => parseFloat(sale.profitMargin) * 100
    );

    createChart(revenueData, labels, 'bar', 'revenueChart');
    createChart(unitsSoldData, labels, 'bar', 'unitsSoldChart');
    createChart(profitMarginData, labels, 'bar', 'profitMarginChart');
  };

  useEffect(() => {
    createCharts();
  }, [selectedProducts]);

  return (
    <div>
      <div className={styles.title}>
        <h2>Product Comparison</h2>
        <b>Select products to compare:</b>
      </div>
      <List className={styles.products}>
        {salesData.map((sale) => (
          <ListItem key={sale.productId} disablePadding>
            <Checkbox
              disabled={
                selectedProducts.length === MAX_SELECTED_PRODUCTS &&
                !selectedProducts.includes(sale.productId)
              }
              checked={selectedProducts.includes(sale.productId)}
              onChange={() => handleProductSelect(sale.productId)}
              inputProps={{ 'aria-label': 'select product' }}
            />
            <ListItemText primary={sale.productName} />
          </ListItem>
        ))}
      </List>

      <div className={styles.comparedProducts}>
        {selectedSalesData.map((sale) => (
          <div key={sale.productId}>
            <h4>{sale.productName}</h4>
            <p>Revenue: {sale.revenue}</p>
            <p>Units Sold: {sale.unitsSold}</p>
            <p>Profit Margin: {sale.profitMargin}</p>
          </div>
        ))}
      </div>

      <div className={styles.chartsContainer}>
        <div>
          <h3>Revenue Comparison</h3>
          <canvas id="revenueChart" width="400" height="200"></canvas>
        </div>
        <div>
          <h3>Units Sold Comparison</h3>
          <canvas id="unitsSoldChart" width="400" height="200"></canvas>
        </div>
        <div>
          <h3>Profit Margin Comparison</h3>
          <canvas id="profitMarginChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
