import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InventoryMonitoringInterface from "../components/InventoryMonitoringInterface";

describe("Synchronization Indicators", () => {
  it("should display synchronization status correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    

    // Assert
    expect(screen.getAllByText("Synced").length).toBeGreaterThan(0);
  });

  it("should display device connection status correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    

    // Assert
    expect(screen.getAllByText("Online").length).toBeGreaterThan(0);
  });

  it("should display last synced timestamp correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    

    // Assert
    expect(
      screen.getAllByText("June 23, 2026 11:30 AM").length
    ).toBeGreaterThan(0);
  });
});