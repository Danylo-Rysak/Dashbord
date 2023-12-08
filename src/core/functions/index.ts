import { Sale } from 'core/types';

export const generateMockSalesData = (): Array<Sale> => {
  const categories = ['Electronics', 'Clothing', 'Home Appliances'];

  const getRandomValue = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomProfitMargin = (): string => Math.random().toFixed(2);

  const startDate = new Date(2023, 0, 1);
  const currentDate = new Date(startDate);

  return categories.flatMap((category) =>
    Array.from({ length: 10 }, (_, i) => {
      currentDate.setDate(startDate.getDate() + i);

      return {
        productId: `${category}${i + 1}`,
        productCategory: category,
        productName: `${category} Product ${i + 1}`,
        revenue: getRandomValue(1000, 11000),
        unitsSold: getRandomValue(10, 60),
        profitMargin: getRandomProfitMargin(),
        date: currentDate.toISOString().split('T')[0],
      };
    })
  );
};

export const sortSalesData = (
  salesData: Array<Sale>,
  sortBy: 'revenue' | 'unitsSold' | 'profitMargin',
  sortOrder: 'asc' | 'desc'
): Array<Sale> => {
  return [...salesData]?.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'revenue':
        return (a.revenue - b.revenue) * order;
      case 'unitsSold':
        return (a.unitsSold - b.unitsSold) * order;
      case 'profitMargin':
        return (parseFloat(a.profitMargin) - parseFloat(b.profitMargin)) * order;
      default:
        return 0;
    }
  });
};

export const getFilteredData = (data: Array<Sale>, category: string | null) => {
  return category ? data.filter((sale) => sale.productCategory === category) : data;
};
