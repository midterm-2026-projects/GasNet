import { describe, it, expect } from "vitest";
import synchronizeInventory from "../src/services/InventorySynchronizationService.js";
import mockInventoryData from "../src/data/mockInventoryData.js";

describe("InventorySynchronizationService", () => {
  it("should synchronize inventory successfully", () => {
    // Arrange
    const inventory = mockInventoryData;

    // Act
    const result = synchronizeInventory(inventory);

    // Assert
    expect(result.updated.success).toBe(true);
    expect(result.updated.message).toBe(
      "Stock records updated successfully."
    );
    expect(result.validated).toBe(true);
  });
});