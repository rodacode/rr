export const sortMovesAlphabetical = (movesArray: any[]) => {
  const sortedArray = movesArray.sort((a: any, b: any) => {
    const nameA = a?.move?.url.toLowerCase();
    const nameB = b?.move?.url.toLowerCase();
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
