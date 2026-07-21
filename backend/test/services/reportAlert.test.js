//5-2
import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";

import app from "../../src/app.js";

import * as reportAlertService from "../../src/services/reportAlertService.js";
import { setOnline } from "../../src/services/internet.js";

describe("Report Alert Route Integration Test", () => {
  beforeEach(() => {
    setOnline(true);
  });

  it("should complete the reporting and alert workflow", async () => {
    // Arrange
    setOnline(true);

    // Act
    const response = await request(app).get("/api/report-alert");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Reporting and alert workflow completed successfully."
    );
  });

  it("should return workflow data", async () => {
    // Act
    const response = await request(app).get("/api/report-alert");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.report).toBeDefined();
    expect(response.body.data.alert).toBeDefined();
    expect(response.body.data.reportAccess).toBeDefined();
  });

  it("should save the report locally when offline", async () => {
    // Arrange
    setOnline(false);

    // Act
    const response = await request(app).get("/api/report-alert");

    // Assert
    expect(response.status).toBe(200);

    expect(response.body.data.reportAccess.success).toBe(false);
    expect(response.body.data.reportAccess.message).toBe(
      "No internet. Report saved locally."
    );
  });

  it("should synchronize the report when internet is restored", async () => {
    // Arrange
    setOnline(false);
    await request(app).get("/api/report-alert");

    // Act
    setOnline(true);

    const response = await request(app).get("/api/report-alert");

    // Assert
    expect(response.status).toBe(200);

    expect(response.body.data.reportAccess.success).toBe(true);
    expect(response.body.data.reportAccess.message).toBe(
      "Report synchronized and accessible across devices."
    );
  });

  it("should return 500 when the workflow fails", async () => {
    // Arrange
    vi.spyOn(reportAlertService, "processReportAlert").mockImplementation(() => {
      throw new Error("Workflow failed.");
    });

    // Act
    const response = await request(app).get("/api/report-alert");

    // Assert
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Reporting and alert workflow failed."
    );
    expect(response.body.error).toBe("Workflow failed.");

    vi.restoreAllMocks();
  });
});
