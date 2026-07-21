//5 2
import { describe, it, expect, beforeEach } from "vitest";
import { processReportAlert } from "../../src/services/reportAlertService.js";
import reportAlertResults from "../../src/data/reportAlertResults.js";
import { setOnline } from "../../src/services/internet.js";
import { getLocalReport } from "../../src/services/reportStorage.js";

describe("Report Alert Service Integration Test", () => {
  beforeEach(() => {
    reportAlertResults.length = 0;
    setOnline(true);
  });

  it("should complete the reporting and alert workflow", () => {
    // Arrange
    setOnline(true);

    // Act
    const result = processReportAlert();

    // Assert
    expect(result.report).toBeDefined();
    expect(result.reportAccess.success).toBe(true);
    expect(result.alert.success).toBe(true);
    expect(result.verification.success).toBe(true);
    expect(reportAlertResults.length).toBe(1);
  });

  it("should save the report locally when offline", () => {
    // Arrange
    setOnline(false);

    // Act
    const result = processReportAlert();

    // Assert
    expect(result.report).toBeDefined();
    expect(result.reportAccess.success).toBe(false);
    expect(result.reportAccess.message).toBe(
      "No internet. Report saved locally."
    );

    expect(getLocalReport()).toEqual(result.report);
  });

  it("should synchronize the locally saved report when internet is restored", () => {
    // Arrange
    setOnline(false);
    processReportAlert(); // Save report locally

    // Act
    setOnline(true);
    const result = processReportAlert();

    // Assert
    expect(result.reportAccess.success).toBe(true);
    expect(result.reportAccess.message).toBe(
      "Report synchronized and accessible across devices."
    );

    expect(result.verification.success).toBe(true);
  });

  it("should store the completed workflow result", () => {
    // Act
    const result = processReportAlert();

    // Assert
    expect(reportAlertResults).toContainEqual(result);
  });

  it("should include a completion timestamp", () => {
    // Act
    const result = processReportAlert();

    // Assert
    expect(result.completedAt).toBeDefined();
  });
});
