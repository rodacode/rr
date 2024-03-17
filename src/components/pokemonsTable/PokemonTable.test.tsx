import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import PokemonsTable from "./PokemonsTable";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockPokemons = [
  { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
];

describe("Pokemons Table component", () => {
  it("renders table rows with pokemons data", () => {
    render(
      <Router>
        <PokemonsTable pokemons={mockPokemons} />
      </Router>
    );

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByText(pokemon.url)).toBeInTheDocument();
    });
  });

  it("navigates when a row is clicked", () => {
    render(
      <Router>
        <PokemonsTable pokemons={mockPokemons} />
      </Router>
    );

    fireEvent.click(screen.getByText("Bulbasaur"));
    expect(mockNavigate).toHaveBeenCalledWith("/1");

    fireEvent.click(screen.getByText("Charmander"));
    expect(mockNavigate).toHaveBeenCalledWith("/4");
  });
});
