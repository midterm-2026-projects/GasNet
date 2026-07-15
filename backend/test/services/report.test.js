import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("GET /api/reports", () => {
  it("should generate and retrieve sales report successfully", async () => {
    // Arrange
    const endpoint = "/api/reports";

    // Act
    const response = await request(app)
      .get(endpoint)
      .expect(200);

    // Assert
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Sales report generated successfully."
    );

    expect(response.body.data).toHaveProperty("totalTransactions");
    expect(response.body.data).toHaveProperty("totalSales");
    expect(response.body.data).toHaveProperty("reports");

    expect(response.body.data.totalTransactions).toBe(1);
    expect(response.body.data.totalSales).toBe(950);
    expect(response.body.data.reports.length).toBe(1);
  });
});