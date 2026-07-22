// Week 6 - Day 1

import { describe, it, expect, beforeEach } from "vitest";

import {
  validateSystem,
  verifyObjective2,
} from "../../src/services/systemValidationService.js";

import systemValidationResults from "../../src/data/systemValidationResults.js";

describe("Final System Validation Service", () => {
  beforeEach(() => {
    systemValidationResults.length = 0;
  });

  it("should complete the synchronization workflow successfully", () => {
    // Arrange

    // Act
    const result = validateSystem();

    // Assert
    expect(result.synchronization.verification.success).toBe(true);
    expect(result.reporting.verification.success).toBe(true);
  });

  it("should satisfy all Objective 2 requirements", () => {
    // Arrange

    // Act
    const result = validateSystem();

    // Assert
    expect(result.objective2.success).toBe(true);
    expect(result.objective2.message).toBe(
      "Objective 2 requirements satisfied."
    );
  });

  it("should store the final validation result", () => {
    // Arrange
    const initialLength = systemValidationResults.length;

    // Act
    validateSystem();

    // Assert
    expect(systemValidationResults.length).toBe(initialLength + 1);
  });

  it("should include a completion timestamp", () => {
    // Arrange

    // Act
    const result = validateSystem();

    // Assert
    expect(result.completedAt).toBeDefined();
  });

  it("should verify Objective 2 successfully", () => {
    // Arrange
    const syncResult = {
      verification: {
        success: true,
      },
    };

    const reportResult = {
      verification: {
        success: true,
      },
    };

    // Act
    const result = verifyObjective2(syncResult, reportResult);

    // Assert
    expect(result).toBe(true);
  });
});