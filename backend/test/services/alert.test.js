//4-2
import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

import * as internet from "../../src/services/internet.js";
import * as alertService from "../../src/services/alertService.js";

describe("GET /api/alerts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should deliver alert successfully when internet is online", async () => {
    // Arrange
    vi.spyOn(internet, "isOnline").mockReturnValue(true);

    const endpoint = "/api/alerts";

    // Act
    const response = await request(app)
      .get(endpoint)
      .expect(200);

    // Assert
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Alert delivered successfully."
    );

    expect(response.body.data).toHaveProperty("alertId");
    expect(response.body.data).toHaveProperty("branchId");
    expect(response.body.data).toHaveProperty("productId");
    expect(response.body.data).toHaveProperty("alertType");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data).toHaveProperty("createdAt");

    expect(response.body.data.delivered).toBe(true);
  });

  it("should queue alert successfully when internet is offline", async () => {
    // Arrange
    vi.spyOn(internet, "isOnline").mockReturnValue(false);

    const endpoint = "/api/alerts";

    // Act
    const response = await request(app)
      .get(endpoint)
      .expect(200);

    // Assert
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Alert queued successfully."
    );

    expect(response.body.data.delivered).toBe(false);
  });

  it("should return 500 when alert processing fails", async () => {
  // Arrange
  vi.spyOn(alertService, "processAlert").mockImplementation(() => {
    throw new Error("Alert validation failed.");
  });

  const endpoint = "/api/alerts";

  // Act
  const response = await request(app)
    .get(endpoint)
    .expect(500);

  // Assert
  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe(
    "Failed to process alert notification."
  );

  expect(response.body.error).toBe(
    "Alert validation failed."
  );
});
});