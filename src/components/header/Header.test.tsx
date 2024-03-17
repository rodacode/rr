import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("renders with the correct title", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const titleElement = screen.getByText("POKEMON APP");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
  });

  it("links to the home page", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const linkElement = screen.getByText("POKEMON APP");
    // eslint-disable-next-line testing-library/no-node-access
    expect(linkElement.closest("a")).toHaveAttribute("href", "/");
  });
});
