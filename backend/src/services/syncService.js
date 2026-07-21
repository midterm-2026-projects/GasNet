//5-1
import synchronizeTransaction from "./TransactionSynchronizationService.js";
import { syncInventory } from "./inventoryService.js";
import syncResults from "../data/syncResults.js";

function verifyResults(transactionResult, inventoryResult) {
  return transactionResult.validated && inventoryResult.success;
}

function processSync() {
  const transactionResult = synchronizeTransaction();

  const inventoryResult = syncInventory();

  const verified = verifyResults(transactionResult, inventoryResult);

  const result = {
    transactionSync: transactionResult,
    inventorySync: inventoryResult,
    verification: {
      success: verified,
      message: verified
        ? "Synchronization completed successfully."
        : "Synchronization failed.",
    },
    completedAt: new Date().toISOString(),
  };

  syncResults.push(result);

  return result;
}

export { processSync, verifyResults };
