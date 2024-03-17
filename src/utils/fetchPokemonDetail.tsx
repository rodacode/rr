export const fetchPokemonDetail = async (id: string | undefined) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error fetching Pokemons", e);
  }
};
