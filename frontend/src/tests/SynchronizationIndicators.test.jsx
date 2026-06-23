import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SynchronizationIndicators from "../components/SynchronizationIndicators";

describe("SynchronizationIndicators", () => {
  it("should display the synchronization indicators title", () => {
    // Arrange
    render(<SynchronizationIndicators />);

    // Act
    
    // Assert
    expect(screen.getByText("Synchronization Indicators")).toBeInTheDocument();
  });

  it("should display overall sync status correctly", () => {
    // Arrange
    render(<SynchronizationIndicators />);

    // Act
    

    // Assert
    expect(screen.getByText("Overall Sync Status")).toBeInTheDocument();
    expect(screen.getByText("Synced")).toBeInTheDocument();
  });

  it("should display device connection status correctly", () => {
    // Arrange
    render(<SynchronizationIndicators />);

    // Act


    // Assert
    expect(screen.getByText("Device Connection")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("should display last synced timestamp correctly", () => {
    // Arrange
    render(<SynchronizationIndicators />);

    // Act


    // Assert
    expect(screen.getByText("Last Synced")).toBeInTheDocument();
    expect(screen.getByText("June 23, 2026 11:30 AM")).toBeInTheDocument();
  });
});