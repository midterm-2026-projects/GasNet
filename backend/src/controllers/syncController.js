//5-1
import { processSync } from "../services/syncService.js";

function syncController(req, res) {
  try {
    const result = processSync();

    res.status(200).json({
      success: true,
      message: "Synchronization workflow completed successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Synchronization workflow failed.",
      error: error.message,
    });
  }
}

export default syncController;

