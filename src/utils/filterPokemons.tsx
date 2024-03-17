export const filterPokemons = (pokemons: any[], searchTerm: string) =>
  pokemons &&
  pokemons.filter((pokemon: any) =>
    pokemon?.name?.toLowerCase().includes(searchTerm)
  );
