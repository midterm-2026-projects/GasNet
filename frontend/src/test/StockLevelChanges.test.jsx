import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InventoryMonitoringInterface from "../components/InventoryMonitoringInterface";

describe("Stock Level Changes", () => {
  it("should display previous stock values correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    
    // Assert
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("should display current stock values correctly", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    
    // Assert
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("should display stock changes accurately", () => {
    // Arrange
    render(<InventoryMonitoringInterface />);

    // Act
    

    // Assert
    expect(screen.getByText("-5")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});