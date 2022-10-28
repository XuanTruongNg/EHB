import { Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "components/PageHeader";
import AddProjectModal from "containers/Project/AddProject/AddProjectModal";
import ProjectSearchBar from "containers/Project/ListProject/ProjectSearchBar";
import ProjectTable from "containers/Project/ListProject/ProjectTable";
import { pageHeaderText } from "core/constant";
import { HEADER_MARGIN, PAGE_HEADER_MARGIN } from "core/constant/spacing";
import { FilterParams } from "core/interface/api";
import { Project as ProjectModel } from "core/interface/models";
import { useGetProject } from "hooks";

type SFilter = FilterParams<ProjectModel> | undefined;

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterData, setFilterData] = useState<SFilter>({ orderBy: "updatedAt", order: "DESC" });

  const { projects, isFetching } = useGetProject(filterData);

  return (
    <>
      <PageHeader title={pageHeaderText.PROJECTS} height={60} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "32px",
          p: "32px",
          flex: 1,
          overflow: "auto",
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}%)`,
        }}
      >
        <ProjectSearchBar setFilterData={setFilterData} setIsModalOpen={setIsModalOpen} />

        <ProjectTable
          isFetching={isFetching}
          projects={projects}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </Box>
      <AddProjectModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default Project;
