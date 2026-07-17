//4-1
import { getSalesReport } from "../services/reportService.js";

function reportController(req, res) {
  try {
    const report = getSalesReport();

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