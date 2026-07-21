//4-2
import { processAlert } from "../services/alertService.js";

function alertController(req, res) {
  try {
    const result = processAlert();

    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process alert notification.",
      error: error.message,
    });
  }
}

export default alertController;