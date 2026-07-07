const TransactionSynchronizationService = require("../../src/services/TransactionSynchronizationService");

describe("TransactionSynchronizationService", () => {
  test("should synchronize transaction successfully", () => {
    // Arrange
    const service = new TransactionSynchronizationService();

    const transaction = {
      transactionId: "TRX-001",
      product: "LPG 11kg",
      quantity: 2,
    };

    // Act
    const result = service.synchronize(transaction);

    // Assert
    expect(result.sent.success).toBe(true);
    expect(result.records).toHaveLength(2);
    expect(result.validated).toBe(true);
  });
});