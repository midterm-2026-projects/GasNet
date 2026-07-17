//4-1
import { describe, it, expect, vi, beforeEach } from "vitest";

import { getSalesReport } from "../../src/services/reportService.js";

import * as internet from "../../src/services/internet.js";
import * as reportGenerator from "../../src/services/reportGenerator.js";
import * as reportStorage from "../../src/services/reportStorage.js";
import * as reportValidator from "../../src/services/reportValidator.js";

describe("Report Service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate and save report when online", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    vi.spyOn(internet, "isOnline").mockReturnValue(true);

    vi.spyOn(reportGenerator, "generateSalesReport")
      .mockReturnValue(report);

    const saveLocalReportSpy = vi.spyOn(
      reportStorage,
      "saveLocalReport"
    );

    vi.spyOn(reportValidator, "validateSalesReport")
      .mockReturnValue(true);

    // Act
    const result = getSalesReport();

    // Assert
    expect(result).toEqual(report);

    expect(saveLocalReportSpy).toHaveBeenCalledTimes(1);

    expect(saveLocalReportSpy).toHaveBeenCalledWith(report);
  });

  it("should return cached report when offline", () => {
    // Arrange
    const cachedReport = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    vi.spyOn(internet, "isOnline").mockReturnValue(false);

    vi.spyOn(reportStorage, "getLocalReport")
      .mockReturnValue(cachedReport);

    // Act
    const result = getSalesReport();

    // Assert
    expect(result).toEqual(cachedReport);
  });

  it("should throw an error when report validation fails", () => {
    // Arrange
    const report = {
      totalTransactions: 1,
      totalSales: 950,
      reports: [],
    };

    vi.spyOn(internet, "isOnline").mockReturnValue(true);

    vi.spyOn(reportGenerator, "generateSalesReport")
      .mockReturnValue(report);

    vi.spyOn(reportStorage, "saveLocalReport");

    vi.spyOn(reportValidator, "validateSalesReport")
      .mockReturnValue(false);

    // Act & Assert
    expect(() => getSalesReport()).toThrow(
      "Sales report validation failed."
    );
  });
});