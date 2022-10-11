import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { CustomFC } from 'core/interface/component';
import { useState } from 'react';

interface Props {
  onChange: (e: any) => void;
}

const SearchBar: CustomFC<Props> = ({ onChange }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <TextField
      placeholder="Type to search..."
      variant="outlined"
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
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
