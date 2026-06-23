import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StockLevelChanges from "../components/StockLevelChanges";

describe("StockLevelChanges", () => {
  it("should display the stock level changes title", () => {
    // Arrange
    render(<StockLevelChanges />);

    // Act
    // no user interaction needed for display testing

    // Assert
    expect(screen.getByText("Stock Level Changes")).toBeInTheDocument();
  });

  it("should display product names correctly", () => {
    // Arrange
    render(<StockLevelChanges />);

    // Act
    // no user interaction needed

    // Assert
    expect(screen.getByText("LPG 11kg")).toBeInTheDocument();
    expect(screen.getByText("LPG 22kg")).toBeInTheDocument();
    expect(screen.getByText("Regulator")).toBeInTheDocument();
  });

  it("should display previous stock values correctly", () => {
    // Arrange
    render(<StockLevelChanges />);

    // Act

    // Assert
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("should display current stock values correctly", () => {
    // Arrange
    render(<StockLevelChanges />);

    // Act

    // Assert
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getAllByText("15").length).toBeGreaterThan(0);
  });

  it("should display stock changes accurately", () => {
    // Arrange
    render(<StockLevelChanges />);

    // Act

    // Assert
    expect(screen.getByText("-5")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});