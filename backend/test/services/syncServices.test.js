//5-1
import { describe, it, expect } from "vitest";
import { processSync } from "../../src/services/syncService.js";
import syncResults from "../../src/data/syncResults.js";

describe("Sync Service Integration Test", () => {
  it("should complete the synchronization workflow", () => {
    // Arrange
    const initialLength = syncResults.length;

    // Act
    const result = processSync();

    // Assert
expect(result.transactionSync.sent.success).toBe(true);
expect(result.transactionSync.validated).toBe(true);

expect(result.inventorySync.success).toBe(true);

expect(result.verification.success).toBe(true);

expect(syncResults.length).toBe(initialLength + 1);
  });

  it("should store the synchronization result", () => {
    const result = processSync();

    expect(syncResults).toContainEqual(result);
  });

  it("should include a completion timestamp", () => {
    const result = processSync();

    expect(result.completedAt).toBeDefined();
  });
});
