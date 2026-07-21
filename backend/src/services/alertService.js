//4-2
import { isOnline } from "./internet.js";
import localAlertQueue from "../data/localAlertQueue.js";

function generateAlert() {
  return {
    alertId: Date.now(),
    branchId: 1,
    productId: 1,
    alertType: "Low Stock",
    message: "LPG 11kg stock has reached the reorder level.",
    createdAt: new Date().toISOString(),
    delivered: false,
  };
}

function saveLocalAlert(alert) {
  localAlertQueue.push(alert);
}

function getLocalAlerts() {
  return localAlertQueue;
}

function sendAlert(alert) {
  alert.delivered = true;

  return {
    success: true,
    message: "Alert delivered successfully.",
    data: alert,
  };
}

function validateAlert(alert) {
  if (!alert) return false;
  if (!alert.branchId) return false;
  if (!alert.productId) return false;
  if (!alert.message) return false;

  return true;
}

function processAlert(validator = validateAlert) {
  const alert = generateAlert();

  if (!validator(alert)) {
    throw new Error("Alert validation failed.");
  }

  if (!isOnline()) {
    saveLocalAlert(alert);

    return {
      success: true,
      message: "Alert queued successfully.",
      data: alert,
    };
  }

  return sendAlert(alert);
}
export {
  generateAlert,
  saveLocalAlert,
  getLocalAlerts,
  sendAlert,
  validateAlert,
  processAlert,
};
