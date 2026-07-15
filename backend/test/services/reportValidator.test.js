//4-1
import { describe, it, expect } from "vitest";
import { validateSalesReport } from "../../src/services/reportValidator.js";

describe("Report Validator Service", () => {
  it("should return true for a valid sales report", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when report is null", () => {
    // Arrange
    const report = null;

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false when totalTransactions is negative", () => {
    // Arrange
    const report = {
      totalTransactions: -1,
      totalSales: 950,
      reports: [],
    };

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false when totalSales is negative", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: -950,
      reports: [],
    };

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(false);
  });

  it("should return false when reports is not an array", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: null,
    };

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(false);
  });
});