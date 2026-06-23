import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InventoryMonitoringInterface from "../components/InventoryMonitoringInterface";

describe("Inventory Update Status", () => {
  it("should display the inventory synchronization monitoring interface title", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
  

    // Assert
    expect(
      screen.getByText("Inventory Synchronization Monitoring Interface")
    ).toBeInTheDocument();
  });

  it("should display product names correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    

    // Assert
    expect(screen.getByText("LPG 11kg")).toBeInTheDocument();
    expect(screen.getByText("LPG 22kg")).toBeInTheDocument();
    expect(screen.getByText("Regulator")).toBeInTheDocument();
  });

  it("should display inventory update statuses correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    
    // Assert
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});