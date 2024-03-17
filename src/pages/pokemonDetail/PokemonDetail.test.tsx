import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PokemonDetail from "./PokemonDetail";
import * as fetchPokemonDetail from "../../utils/fetchPokemonDetail";
import * as sortMovesAlphabetical from "../../utils/sortMovesAlphabetical";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

const mockPokemonData = {
  name: "bulbasaur",
  sprites: {
    front_default: "bulbasaur_front_sprite.png",
    back_default: "bulbasaur_back_sprite.png",
  },
  abilities: [
    { ability: { name: "chlorophyll" }, is_hidden: true },
    { ability: { name: "overgrow" }, is_hidden: false },
  ],
  moves: [
    { move: { name: "move1" } },
    { move: { name: "move2" } },
    { move: { name: "move3" } },
  ],
};
const mockSortPokemons = () => {
  jest
    .spyOn(sortMovesAlphabetical, "sortMovesAlphabetical")
    .mockImplementation(() => mockPokemonData?.moves);
};

const mockFetchPokemonDetail = () => {
  jest
    .spyOn(fetchPokemonDetail, "fetchPokemonDetail")
    .mockResolvedValue(mockPokemonData);
};

describe("PokemonDetail component", () => {
  beforeEach(() => {
    mockFetchPokemonDetail();
    mockSortPokemons();
  });

  it("renders Pokemon details", async () => {
    render(<PokemonDetail />);
    await screen.findByText("BULBASAUR");
    expect(screen.getByAltText("front sprite")).toBeInTheDocument();
    expect(screen.getByAltText("back sprite")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
    expect(screen.queryByText("overgrow")).not.toBeInTheDocument();
    expect(screen.getByText("move1")).toBeInTheDocument();
    expect(screen.getByText("move2")).toBeInTheDocument();
    expect(screen.getByText("move3")).toBeInTheDocument();
  });

  it("deletes a move when delete button is clicked", async () => {
    render(<PokemonDetail />);
    await screen.findByText("BULBASAUR");

    const buttonRef = await screen.findAllByTestId("delete_button");
    await fireEvent.click(buttonRef[0]);
    expect(screen.queryByText("move1")).not.toBeInTheDocument();
  });
});
