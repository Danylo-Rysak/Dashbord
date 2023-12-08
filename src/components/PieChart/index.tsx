import { FC, useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { Sale } from 'core/types';
import styles from './index.module.css';

interface PieChartProps {
  salesData: Array<Sale>;
}

const PieChart: FC<PieChartProps> = ({ salesData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'pie', number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const categoryLabels = [
          ...new Set(salesData.map((sale) => sale.productCategory)),
        ];
        const categoryData = categoryLabels.map(
          (category) =>
            salesData.filter((sale) => sale.productCategory === category).length
        );

        const chartConfig: ChartConfiguration<'pie', number[], string> = {
          type: 'pie',
          data: {
            labels: categoryLabels,
            datasets: [
              {
                data: categoryData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                ],
              },
            ],
          },
        };

        chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [salesData]);

  return (
    <div className={styles.pieChart}>
      <canvas ref={chartRef} />;
    </div>
  );
};

export default PieChart;
