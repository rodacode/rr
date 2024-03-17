import { useState, useEffect, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useParams } from "react-router-dom";
import { fetchPokemonDetail } from "../../utils/fetchPokemonDetail";
import { sortMovesAlphabetical } from "../../utils/sortMovesAlphabetical";
import Loading from "../../components/loading/Loading";
import { PokemonDetailType } from "../../types";
import {
  mainContainerDetailStyles,
  imgContainerStyles,
  sectionContainerStyles,
  movesItemStyles,
} from "./styles";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<PokemonDetailType>();
  const [abilities, setAbilities] = useState<any>([]);
  const [moves, setMoves] = useState<any>([]);
  const [forms, setForms] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const getPokemon = useCallback(
    async (id: string | undefined) => {
      try {
        setIsLoading(true);
        const response = await fetchPokemonDetail(id);
        setPokemon(response);
        const abilitiesToDisplay = response?.abilities.filter(
          (ability: any) => {
            return ability.is_hidden === true;
          }
        );
        setAbilities(abilitiesToDisplay);
        setMoves(sortMovesAlphabetical(response?.moves));
        const formsResponse = await fetch(response?.forms?.[0].url);
        const formsParsed = await formsResponse.json();
        setForms(formsParsed);
        setIsLoading(false);
      } catch (e) {
        console.log("Error fetching Pokemons", e);
      }
    },
    [setPokemon]
  );

  const handleDeleteMove = (moveName: string) => {
    setMoves(moves.filter((move: any) => move?.move?.name !== moveName));
  };

  useEffect(() => {
    getPokemon(id);
  }, [getPokemon, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={mainContainerDetailStyles}>
      <Typography variant="h2" gutterBottom>
        {pokemon?.name?.toUpperCase()}
      </Typography>
      <Box sx={imgContainerStyles}>
        <img src={pokemon?.sprites?.front_default} alt="front sprite" />
        <img src={pokemon?.sprites?.back_default} alt="back sprite" />
      </Box>
      <Box sx={sectionContainerStyles}>
        <Typography variant="h3" gutterBottom>
          Abilities
        </Typography>

        {abilities.length > 0 ? (
          abilities?.map((ability: any) => (
            <Typography
              variant="body1"
              gutterBottom
              key={ability?.ability?.name}
            >
              {ability?.ability?.name}
            </Typography>
          ))
        ) : (
          <span>No abilities found</span>
        )}
      </Box>

      <Box sx={sectionContainerStyles}>
        <Typography variant="h3" gutterBottom>
          Forms
        </Typography>

        {forms ? (
          <>
            <Typography variant="body1" gutterBottom>
              id: {forms?.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Is battle only: {String(forms?.is_battle_only)}
            </Typography>
          </>
        ) : (
          <span>No forms found</span>
        )}
      </Box>
      <Box sx={sectionContainerStyles}>
        <Typography variant="h3" gutterBottom>
          Moves
        </Typography>
        {moves?.length > 0 ? (
          moves?.map((move: any) => (
            <Box key={move?.move?.name} sx={movesItemStyles}>
              <Typography variant="body1" gutterBottom>
                {move?.move?.name}
              </Typography>
              <Button
                data-testid="delete_button"
                onClick={() => handleDeleteMove(move?.move?.name)}
              >
                <DeleteOutlineIcon />
              </Button>
            </Box>
          ))
        ) : (
          <span>No moves found</span>
        )}
      </Box>
    </Box>
  );
};

export default PokemonDetail;
