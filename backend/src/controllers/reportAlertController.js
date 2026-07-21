// 5  2

import { processReportAlert } from "../services/reportAlertService.js";

function reportAlertController(req, res) {
  try {
    const result = processReportAlert();

    res.status(200).json({
      success: true,
      message: "Reporting and alert workflow completed successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reporting and alert workflow failed.",
      error: error.message,
    });
  }
}

export default reportAlertController;
