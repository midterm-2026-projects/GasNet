import { describe, it, expect } from "vitest";

import {
  generateSalesReport,
  getSalesReport,
  validateSalesReport,
} from "../../src/services/reportService.js";

describe("Report Service", () => {
  it("should generate sales report successfully", () => {
    // Arrange

    // Act
    const report = generateSalesReport();

    // Assert
    expect(report.totalTransactions).toBe(1);
    expect(report.totalSales).toBe(950);
    expect(report.reports.length).toBe(1);
  });

  it("should retrieve sales report successfully", () => {
    // Arrange

    // Act
    const report = getSalesReport();

    // Assert
    expect(report).toHaveProperty("totalTransactions");
    expect(report).toHaveProperty("totalSales");
    expect(report).toHaveProperty("reports");
  });

  it("should validate sales report successfully", () => {
    // Arrange
    const report = generateSalesReport();

    // Act
    const result = validateSalesReport(report);

    // Assert
    expect(result).toBe(true);
  });
});