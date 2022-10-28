import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";

interface Props {
  onChange: (e: string) => void;
}

const SearchBar: FC<Props> = ({ onChange }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <TextField
      placeholder="Type to search..."
      variant="outlined"
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onChange(searchInput);
        }
      }}
      sx={{ height: 45 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
