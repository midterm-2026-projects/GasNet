import { describe, test, expect } from "vitest";
import TransactionDataSender from "../../src/services/TransactionDataSender.js";

describe("TransactionDataSender", () => {
  test("should send transaction data successfully", () => {
    // Arrange
    const sender = new TransactionDataSender();

    const transaction = {
      transactionId: "TRX-001",
      product: "LPG 11kg",
      quantity: 2,
    };

    // Act
    const result = sender.send(transaction);

    // Assert
    expect(result.success).toBe(true);
    expect(result.transaction).toEqual(transaction);
  });
});