import { describe, it, expect } from "vitest";
import updateStockRecords from "../src/services/StockUpdateService.js";
import mockInventoryData from "../src/data/mockInventoryData.js";

describe("StockUpdateService", () => {
  it("should update stock records successfully", () => {
    // Arrange
    const inventory = mockInventoryData;

    // Act
    const result = updateStockRecords(inventory);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Stock records updated successfully.");
    expect(result.inventory).toEqual(inventory);
  });
});