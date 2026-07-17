//4-1
import localReportQueue from "../data/localReportQueue.js";

// Save generated report locally
function saveLocalReport(report) {
  localReportQueue.length = 0;

  localReportQueue.push(report);

  return localReportQueue;
}

// Retrieve cached report
function getLocalReport() {
  return localReportQueue[0] || null;
}

// Clear cached report
function clearLocalReport() {
  localReportQueue.length = 0;
}

export {
  saveLocalReport,
  getLocalReport,
  clearLocalReport,
};