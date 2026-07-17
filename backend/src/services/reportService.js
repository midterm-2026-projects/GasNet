//4-1
import { isOnline } from "./internet.js";
import { generateSalesReport } from "./reportGenerator.js";
import {
  saveLocalReport,
  getLocalReport,
} from "./reportStorage.js";
import { validateSalesReport } from "./reportValidator.js";

function getSalesReport() {
  // Offline
  if (!isOnline()) {
    return getLocalReport();
  }

  // Online
  const report = generateSalesReport();

  saveLocalReport(report);

  const isValid = validateSalesReport(report);

  if (!isValid) {
    throw new Error("Sales report validation failed.");
  }

  return report;
}

export { getSalesReport };