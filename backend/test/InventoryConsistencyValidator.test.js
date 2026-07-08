import { describe, it, expect } from "vitest";
import validateInventoryConsistency from "../src/services/InventoryConsistencyValidator.js";
import mockInventoryData from "../src/data/mockInventoryData.js";

describe("InventoryConsistencyValidator", () => {
  it("should validate inventory consistency successfully", () => {
    // Arrange
    const inventory = mockInventoryData;

    // Act
    const result = validateInventoryConsistency(inventory);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when an inventory record is invalid", () => {
    // Arrange
    const invalidInventory = [
      ...mockInventoryData,
      {
        id: null,
        productName: "",
        stock: -5,
      },
    ];

    // Act
    const result = validateInventoryConsistency(invalidInventory);

    // Assert
    expect(result).toBe(false);
  });
});