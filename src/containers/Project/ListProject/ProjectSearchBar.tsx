import { Box, Button } from "@mui/material";
import { FC, useCallback } from "react";
import SearchBar from "components/SearchBar";
import { buttonText } from "core/constant";
import { FilterParams } from "core/interface/api";
import { Project as ProjectModel } from "core/interface/models";

type SFilter = FilterParams<ProjectModel> | undefined;

interface Props {
  setFilterData: (_filterData: SFilter) => void;
  setIsModalOpen: (_isOpen: boolean) => void;
}

const ProjectSearchBar: FC<Props> = ({ setFilterData, setIsModalOpen }) => {
  const handleSearch = useCallback(
    (searchData: string) => {
      setFilterData((prev: SFilter) => ({ ...prev, searchData, page: 0 }));
    },
    [setFilterData]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{
          backgroundColor: "secondary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            opacity: 0.8,
          },
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {buttonText.ADD_PROJECT}
      </Button>

      <SearchBar onChange={handleSearch} />
    </Box>
  );
};

export default ProjectSearchBar;
