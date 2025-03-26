import React from "react";
import {
  TextField,
  InputAdornment,
  useTheme,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar: React.FC = () => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      sx={{
        width: isMobile ? "100%" : 204,
        height: "36px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "60px",
          height: "36px",   
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0000006B", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0000006B",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "gray" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
