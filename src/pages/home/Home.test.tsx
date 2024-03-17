import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter as Router } from "react-router-dom";
import * as fetchPokemons from "../../utils/fetchPokemons";
import * as filterPokemons from "../../utils/filterPokemons";
import * as sortPokemonsAlphabetical from "../../utils/sortPokemonsAlphabetical";

const mockPokemons = [
  { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
];

const mockFilterPokemons = () => {
  jest
    .spyOn(filterPokemons, "filterPokemons")
    .mockImplementation(() => mockPokemons);
};

const mockSortPokemons = () => {
  jest
    .spyOn(sortPokemonsAlphabetical, "sortPokemonsAlphabetical")
    .mockImplementation(() => mockPokemons);
};

const mockFetchPokemons = () => {
  jest
    .spyOn(fetchPokemons, "fetchPokemons")
    .mockResolvedValue({ data: { results: mockPokemons, count: 2 } } as any);
};

describe("Home component", () => {
  beforeEach(() => {
    mockFetchPokemons();
    mockFilterPokemons();
    mockSortPokemons();
  });

  it("renders loading state while fetching data", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("renders fetched pokemons", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    expect(
      await screen.findByText("https://pokeapi.co/api/v2/pokemon/1/")
    ).toBeInTheDocument();
    expect(await screen.findByText("Charmander")).toBeInTheDocument();
    expect(
      await screen.findByText("https://pokeapi.co/api/v2/pokemon/4/")
    ).toBeInTheDocument();
  });
});
