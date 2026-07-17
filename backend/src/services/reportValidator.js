//4-1
function validateSalesReport(report) {
  if (!report) {
    return false;
  }

  if (report.totalTransactions < 0) {
    return false;
  }

  if (report.totalSales < 0) {
    return false;
  }

  if (!Array.isArray(report.reports)) {
    return false;
  }

  return true;
}

export { validateSalesReport };