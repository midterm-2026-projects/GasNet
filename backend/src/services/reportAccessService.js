// 5-2
import { isOnline } from "./internet.js";
import {
  saveLocalReport,
  getLocalReport,
  clearLocalReport,
} from "./reportStorage.js";

function accessReport(report) {
  // Offline
  if (!isOnline()) {
    saveLocalReport(report);

    return {
      success: false,
      message: "No internet. Report saved locally.",
      data: getLocalReport(),
    };
  }

  // Online
  const localReport = getLocalReport();

  const synchronizedReport = localReport || report;

  clearLocalReport();

  return {
    success: true,
    message: "Report synchronized and accessible across devices.",
    data: synchronizedReport,
  };
}

export { accessReport };
