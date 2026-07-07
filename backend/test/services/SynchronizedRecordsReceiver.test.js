import { describe, test, expect } from "vitest";
import SynchronizedRecordsReceiver from "../../src/services/SynchronizedRecordsReceiver.js";

describe("SynchronizedRecordsReceiver", () => {
  test("should receive synchronized records correctly", () => {
    // Arrange
    const receiver = new SynchronizedRecordsReceiver();

    // Act
    const records = receiver.receive();

    // Assert
    expect(records).toHaveLength(2);
    expect(records[0].status).toBe("Synchronized");
    expect(records[1].status).toBe("Synchronized");
  });
});