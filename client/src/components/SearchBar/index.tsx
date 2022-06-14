import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ThemeContext } from "../../context/theme-context";

import "./Search.scss";

type SearchProps = {
  handleSearch: Function;
};

const Search = ({ handleSearch }: SearchProps) => {
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e: any) => {
    handleSearch(e.target.value);
  };

  return (
    <div className={`search__content search__content__${theme}`}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleInputChange}
          id="outlined-basic"
          label="Product search..."
          color="warning"
          variant="outlined"
        />
      </Box>
    </div>
  );
};

export default Search;
