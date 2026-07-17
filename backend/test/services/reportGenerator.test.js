//4-1
import { describe, it, expect } from "vitest";
import { generateSalesReport } from "../../src/services/reportGenerator.js";

describe("Report Generator Service", () => {
  it("should generate sales report successfully", () => {
    // Arrange

    // Act
    const report = generateSalesReport();

    // Assert
    expect(report.totalTransactions).toBe(1);
    expect(report.totalSales).toBe(950);
    expect(report.reports).toHaveLength(1);
  });
});