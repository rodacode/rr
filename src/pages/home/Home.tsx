import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import PokemonsTable from "../../components/pokemonsTable/PokemonsTable";
import FilterSearch from "../../components/filterSearch/FilterSearch";
import Loading from "../../components/loading/Loading";
import { filterPokemons } from "../../utils/filterPokemons";
import { sortPokemonsAlphabetical } from "../../utils/sortPokemonsAlphabetical";
import { Pokemon } from "../../types";
import { mainContainerStyles } from "./styles";
import { fetchPokemons } from "../../utils/fetchPokemons";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSearch = (e: any) => {
    setIsLoading(true);
    setSearchTerm(e.target.value.toLowerCase());
    setFilteredPokemons(filterPokemons(pokemons, e.target.value.toLowerCase()));
    setIsLoading(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getPokemons();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPokemons = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchPokemons(page, rowsPerPage);
      const sortedResult = sortPokemonsAlphabetical(response?.results);
      setPokemons(sortedResult as unknown as any[]);
      setFilteredPokemons(sortedResult as unknown as any[]);
      setTotalResults(response?.count);
      setIsLoading(false);
    } catch (e) {
      console.log("Error fetching Pokemons", e);
    }
  }, [setPokemons, page, rowsPerPage]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={mainContainerStyles}>
      <FilterSearch searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <PokemonsTable pokemons={filteredPokemons} />
      <TablePagination
        component="div"
        count={totalResults}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Home;
