import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FilterSearch from "./FilterSearch";

const mockSetSearchTerm = jest.fn();

describe("FilterSearch component", () => {
  it("renders with the correct label and value", () => {
    render(
      <FilterSearch setSearchTerm={mockSetSearchTerm} searchTerm="Pikachu" />
    );

    const inputElement = screen.getByLabelText("Search Pokemon");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls setSearchTerm with the correct value on change", () => {
    render(<FilterSearch setSearchTerm={mockSetSearchTerm} searchTerm="" />);

    const inputElement = screen.getByLabelText("Search Pokemon");
    fireEvent.change(inputElement, { target: { value: "Bulbasaur" } });

    expect(mockSetSearchTerm).toHaveBeenCalled();
  });
});
