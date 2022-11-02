import { Box } from "@mui/material";
import { FC, useCallback } from "react";
import SearchBar from "components/SearchBar";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";

type SFilter = FilterParams<ResourceModel> | undefined;

interface Props {
  setFilterData: (_filterData: SFilter) => void;
  setModelControl: (_modeControl: "ADD" | "EDIT" | null) => void;
}

// NOTE: setModelControl is temporary disabled, adding new resource is not allowed - US224
// eslint-disable-next-line no-unused-vars
const ResourceSearchBar: FC<Props> = ({ setFilterData, setModelControl }) => {
  const handleSearch = useCallback(
    (searchData: string) => {
      setFilterData((prev: SFilter) => ({ ...prev, searchData, page: 0 }));
    },
    [setFilterData]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {/* <Button
        sx={{
          backgroundColor: "secondary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            opacity: 0.8,
          },
        }}
        onClick={() => setModelControl("ADD")}
      >
        {buttonText.ADD_RESOURCE}
      </Button> */}

      <SearchBar onChange={handleSearch} />
    </Box>
  );
};

export default ResourceSearchBar;
