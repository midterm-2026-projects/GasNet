import mockSalesTransactions from "../data/mockSalesTransactions.js";

function generateSalesReport() {
  const totalTransactions = mockSalesTransactions.length;

  const totalSales = mockSalesTransactions.reduce(
    (sum, transaction) => sum + transaction.total,
    0
  );

  return {
    totalTransactions,
    totalSales,
    reports: mockSalesTransactions,
  };
}

export { generateSalesReport };