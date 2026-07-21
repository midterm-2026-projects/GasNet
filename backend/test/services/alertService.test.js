//4-2

import { describe, it, expect, vi, afterEach } from "vitest";
import * as internet from "../../src/services/internet.js";

import {
  generateAlert,
  saveLocalAlert,
  getLocalAlerts,
  sendAlert,
  validateAlert,
  processAlert,
} from "../../src/services/alertService.js";

describe("Alert Notification Service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate alert successfully", () => {
    // Arrange

    // Act
    const alert = generateAlert();

    // Assert
    expect(alert).toHaveProperty("alertId");
    expect(alert).toHaveProperty("branchId");
    expect(alert).toHaveProperty("productId");
    expect(alert).toHaveProperty("alertType");
    expect(alert).toHaveProperty("message");
    expect(alert).toHaveProperty("createdAt");
    expect(alert.delivered).toBe(false);
  });

  it("should deliver alert to connected devices", () => {
    // Arrange
    const alert = generateAlert();

    // Act
    const result = sendAlert(alert);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Alert delivered successfully.");
    expect(result.data.delivered).toBe(true);
  });

  it("should save alert locally when internet is offline", () => {
    // Arrange
    vi.spyOn(internet, "isOnline").mockReturnValue(false);

    // Act
    const result = processAlert();

    const alerts = getLocalAlerts();

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Alert queued successfully.");
    expect(alerts.length).toBeGreaterThan(0);
  });

  it("should validate alert successfully", () => {
    // Arrange
    const alert = generateAlert();

    // Act
    const result = validateAlert(alert);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false for invalid alert", () => {
    // Arrange
    const invalidAlert = {
      message: "",
    };

    // Act
    const result = validateAlert(invalidAlert);

    // Assert
    expect(result).toBe(false);
  });


  it("should throw an error when alert validation fails", () => {
  // Arrange
  const invalidValidator = () => false;

  // Act & Assert
  expect(() => processAlert(invalidValidator)).toThrow(
    "Alert validation failed.");
});
});