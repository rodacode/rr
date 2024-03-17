export const sortPokemonsAlphabetical = (pokemonsArray: any[]) => {
  const sortedArray = pokemonsArray.sort((a: any, b: any) => {
    const nameA = a?.name.toLowerCase();
    const nameB = b?.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedArray;
};
