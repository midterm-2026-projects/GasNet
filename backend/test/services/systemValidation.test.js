// Week 6 - Day 1

import request from "supertest";
import { describe, it, expect, vi } from "vitest";

import app from "../../src/app.js";

import * as systemValidationService from "../../src/services/systemValidationService.js";

describe("Final System Validation End-to-End Test", () => {
  it("should complete the final system validation successfully", async () => {
    // Act
    const response = await request(app).get("/api/system-validation");

    // Assert
    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Final system validation completed successfully."
    );
  });

  it("should return the complete validation workflow", async () => {
    // Act
    const response = await request(app).get("/api/system-validation");

    // Assert
    expect(response.status).toBe(200);

    expect(response.body.data).toBeDefined();

    expect(response.body.data.synchronization).toBeDefined();

    expect(response.body.data.reporting).toBeDefined();

    expect(response.body.data.objective2).toBeDefined();

    expect(response.body.data.completedAt).toBeDefined();
  });

  it("should satisfy all Objective 2 requirements", async () => {
    // Act
    const response = await request(app).get("/api/system-validation");

    // Assert
    expect(response.status).toBe(200);

    expect(response.body.data.objective2.success).toBe(true);

    expect(response.body.data.objective2.message).toBe(
      "Objective 2 requirements satisfied."
    );
  });

  it("should return 500 when system validation fails", async () => {
    // Arrange
    vi.spyOn(systemValidationService, "validateSystem").mockImplementation(() => {
      throw new Error("System validation failed.");
    });

    // Act
    const response = await request(app).get("/api/system-validation");

    // Assert
    expect(response.status).toBe(500);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Final system validation failed."
    );

    expect(response.body.error).toBe(
      "System validation failed."
    );

    vi.restoreAllMocks();
  });
});