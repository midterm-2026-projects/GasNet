import {
  getSalesReport,
  validateSalesReport,
} from "../services/reportService.js";

function reportController(req, res) {
  try {
    const report = getSalesReport();

    const isValid = validateSalesReport(report);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid sales report.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales report generated successfully.",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate sales report.",
      error: error.message,
    });
  }
}

export default reportController;