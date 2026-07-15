import { describe, it, expect, beforeEach } from "vitest";

import {
  saveLocalReport,
  getLocalReport,
  clearLocalReport,
} from "../../src/services/reportStorage.js";

describe("Report Storage Service", () => {
  beforeEach(() => {
    clearLocalReport();
  });

  it("should save report locally", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    // Act
    saveLocalReport(report);

    // Assert
    expect(getLocalReport()).toEqual(report);
  });

  it("should retrieve cached report", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    saveLocalReport(report);

    // Act
    const cachedReport = getLocalReport();

    // Assert
    expect(cachedReport).toEqual(report);
  });

  it("should clear cached report", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    saveLocalReport(report);

    // Act
    clearLocalReport();

    // Assert
    expect(getLocalReport()).toBeNull();
  });
});