import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InventoryStatus from "../components/InventoryStatus";

describe("InventoryStatus", () => {
  it("should display the inventory update status title", () => {
    // Arrange
    render(<InventoryStatus />);

    // Act
    

    // Assert
    expect(screen.getByText("Inventory Update Status")).toBeInTheDocument();
  });

  it("should display product names correctly", () => {
    // Arrange
    render(<InventoryStatus />);

    // Act
    

    // Assert
    expect(screen.getByText("LPG 11kg")).toBeInTheDocument();
    expect(screen.getByText("LPG 22kg")).toBeInTheDocument();
    expect(screen.getByText("Regulator")).toBeInTheDocument();
  });

  it("should display inventory update statuses correctly", () => {
    // Arrange
    render(<InventoryStatus />);

    // Act
    
    // Assert
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});