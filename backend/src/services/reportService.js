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

function getSalesReport() {
  return generateSalesReport();
}

function validateSalesReport(report) {
  return (
    report.totalTransactions > 0 &&
    report.totalSales >= 0 &&
    Array.isArray(report.reports)
  );
}

export {
  generateSalesReport,
  getSalesReport,
  validateSalesReport,
};