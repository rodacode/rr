import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pokemon } from "../../types";
import { tableContainerStyles, StyledTableRow } from "./styles";

const PokemonsTable = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const navigate = useNavigate();

  const handleRowClick = (pokemonUrl: string) => {
    const regex = /(\d+)\/$/;
    const match = pokemonUrl.match(regex);
    const idFromUrl = match ? match[1] : null;
    navigate(`/${idFromUrl}`);
  };

  return (
    <Box sx={tableContainerStyles}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons?.length > 0
              ? pokemons.map((pokemon: Pokemon) => (
                  <StyledTableRow
                    key={pokemon?.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleRowClick(pokemon?.url)}
                  >
                    <TableCell>{pokemon?.name}</TableCell>
                    <TableCell align="right">{pokemon?.url}</TableCell>
                  </StyledTableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PokemonsTable;
