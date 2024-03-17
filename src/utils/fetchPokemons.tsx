export const fetchPokemons = async (page: number, rowsPerPage: number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        page * rowsPerPage
      }&limit=${rowsPerPage}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error fetching Pokemons", e);
  }
};
