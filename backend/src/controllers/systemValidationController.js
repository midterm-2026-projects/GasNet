// Week 6 - Day 1

import { validateSystem } from "../services/systemValidationService.js";

function systemValidationController(req, res) {
  try {
    const result = validateSystem();

    res.status(200).json({
      success: true,
      message: "Final system validation completed successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Final system validation failed.",
      error: error.message,
    });
  }
}

export default systemValidationController;