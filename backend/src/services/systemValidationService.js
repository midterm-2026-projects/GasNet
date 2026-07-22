// Week 6 - Day 1

import { processSync } from "./syncService.js";
import { processReportAlert } from "./reportAlertService.js";
import systemValidationResults from "../data/systemValidationResults.js";

function verifyObjective2(syncResult, reportAlertResult) {
  return (
    syncResult.verification.success &&
    reportAlertResult.verification.success
  );
}

function validateSystem() {
  // Step 1: Run complete synchronization workflow
  const syncResult = processSync();

  // Step 2: Run reporting and alert workflow
  const reportAlertResult = processReportAlert();

  // Step 3: Verify Objective 2
  const objectivePassed = verifyObjective2(
    syncResult,
    reportAlertResult
  );

  // Step 4: Build final validation report
  const result = {
    synchronization: syncResult,
    reporting: reportAlertResult,

    objective2: {
      success: objectivePassed,
      message: objectivePassed
        ? "Objective 2 requirements satisfied."
        : "Objective 2 requirements failed.",
    },

    completedAt: new Date().toISOString(),
  };

  // Step 5: Save validation result
  systemValidationResults.push(result);

  return result;
}

export {
  validateSystem,
  verifyObjective2,
};