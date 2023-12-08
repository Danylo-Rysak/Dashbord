// LineChart.tsx
import React, { FC, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Sale } from 'core/types';

interface LineChartProps {
  salesData: Array<Sale>;
}

const LineChart: FC<LineChartProps> = ({ salesData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const dates = salesData.map((sale) => sale.date);
        const revenues = salesData.map((sale) => sale.revenue);

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Sales Trend',
                data: revenues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                labels: dates,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [salesData]);

  return <canvas ref={chartRef} style={{ marginTop: '20px' }} />;
};

export default LineChart;
