import { Box, TextField } from "@mui/material";
import { filterContainerStyles, filterInputStyles } from "./styles";

const FilterSearch = ({
  setSearchTerm,
  searchTerm,
}: {
  setSearchTerm: any;
  searchTerm: string;
}) => {
  return (
    <Box sx={filterContainerStyles}>
      <TextField
        label="Search Pokemon"
        value={searchTerm}
        onChange={setSearchTerm}
        sx={filterInputStyles}
      />
    </Box>
  );
};

export default FilterSearch;
