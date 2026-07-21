// 5 Day 2

import { getSalesReport } from "./reportService.js";
import { accessReport } from "./reportAccessService.js";
import { processAlert } from "./alertService.js";
import reportAlertResults from "../data/reportAlertResults.js";

function verifyWorkflow(reportAccess, alertResult) {
  return reportAccess.success && alertResult.success;
}

function processReportAlert() {
  // Step 1: Generate report
  const report = getSalesReport();

  // Step 2: Make report accessible across devices
  const reportAccess = accessReport(report);

  // Step 3: Trigger alert
  const alert = processAlert();

  // Step 4: Verify workflow
  const verified = verifyWorkflow(reportAccess, alert);

  const result = {
    report,
    reportAccess,
    alert,
    verification: {
      success: verified,
      message: verified
        ? "Reporting and alert workflow completed successfully."
        : "Reporting and alert workflow failed.",
    },
    completedAt: new Date().toISOString(),
  };

  reportAlertResults.push(result);

  return result;
}
export { processReportAlert, verifyWorkflow };
