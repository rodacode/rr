import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/home/Home";
import PokemonDetail from "./pages/pokemonDetail/PokemonDetail";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
import { SxProps } from "@mui/material/styles";

const mainContainerStyles: SxProps = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "16px",
};

function App() {
  return (
    <Box sx={mainContainerStyles}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PokemonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
