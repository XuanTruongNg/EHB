import { Box } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import PageHeader from "components/PageHeader";
import ResourceModal from "containers/Resource/AddEditResource/ResourceModal";
import ResourceSearchBar from "containers/Resource/AddEditResource/ResourceSearchBar";
import ResourceTable from "containers/Resource/AddEditResource/ResourceTable";
import { pageHeaderText } from "core/constant";
import { HEADER_MARGIN, PAGE_HEADER_MARGIN } from "core/constant/spacing";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";
import { useGetResource } from "hooks";

type SFilter = FilterParams<ResourceModel> | undefined;

const Resource = () => {
  const [modalControl, setModalControl] = useState<"ADD" | "EDIT" | null>(null);

  const [selectedId, setSelectedId] = useState<number>(-1);

  const [filterData, setFilterData] = useState<SFilter>(undefined);

  const { resources, isFetching } = useGetResource(filterData);

  const onCellClick = (params: GridCellParams) => {
    const { row } = params;
    setSelectedId(row.id);
    setModalControl("EDIT");
  };

  return (
    <>
      <PageHeader title={pageHeaderText.RESOURCES} height={60} />
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
        <ResourceSearchBar setFilterData={setFilterData} setModelControl={setModalControl} />

        <ResourceTable
          resources={resources}
          isFetching={isFetching}
          onCellClick={onCellClick}
          setFilterData={setFilterData}
          filterData={filterData}
        />
      </Box>

      <ResourceModal
        isOpen={modalControl === "ADD" || modalControl === "EDIT"}
        setModalControl={setModalControl}
        type={modalControl}
        id={selectedId}
      />
    </>
  );
};

export default Resource;
