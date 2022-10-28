import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from "react";
import DatagridC, { TableOnChangeData } from "components/Datagrid";
import { resourceText } from "core/constant";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";
import { ResourcesResponse } from "core/interface/resource";
import { Columns, Rows } from "core/interface/table";

const { headerColumnText } = resourceText;

type SFilter = FilterParams<ResourceModel> | undefined;

interface Props {
  isFetching: boolean;
  resources: ResourcesResponse | undefined;
  isSearchFormCollapse: boolean;
  setIsSearchFormCollapse: Dispatch<SetStateAction<boolean>>;
  setSelectedResources: (_data: number[]) => void;
  filterData: SFilter;
  setFilterData: (_filterData: SFilter) => void;
}

//TODO handle situation where resource doesn't have current project
const dumbCurrentProjects = [
  {
    id: 1,
    name: "project 1",
    code: "dumb",
    startDate: "10-10-2022",
    endDate: "10-20-2022",
  },
  {
    id: 2,
    name: "project 2",
    code: "dumb2",
    startDate: "10-10-2022",
    endDate: "10-20-2023",
  },
];

const ResourceTable: FC<Props> = ({
  resources,
  isFetching,
  isSearchFormCollapse,
  setIsSearchFormCollapse,
  setSelectedResources,
  filterData,
  setFilterData,
}) => {
  const resourceColumns = useMemo<Columns<ResourceModel>>(
    () => [
      {
        field: "code",
        headerName: headerColumnText.CODE,
        flex: 0.5,
        cellClassName: "FirstColumn-DataGrid",
        headerClassName: "FirstColumn-DataGrid",
      },
      {
        field: "name",
        headerName: headerColumnText.RESOURCE_NAME,
        flex: 1,
      },
      {
        field: "roles",
        headerName: headerColumnText.ROLE,
        flex: 1,
      },
      {
        field: "hardSkills",
        headerName: headerColumnText.HARD_SKILLS,
        flex: 1,
        sortable: false,
      },
      {
        field: "yearsOfExperience",
        headerName: headerColumnText.YEARS_EXP,
        flex: 1,
        sortable: false,
      },
      {
        field: "currentProjects",
        headerName: headerColumnText.CURRENT_PROJECTS,
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <div>
            {params.value.map((item: string, index: number) => (
              <Typography key={index} sx={{ fontSize: 14 }}>
                {item}
              </Typography>
            ))}
          </div>
        ),
        type: "string",
      },
      {
        field: "projectsEndDate",
        headerName: headerColumnText.PROJECTS_END_DATE,
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <div>
            {params.value.map((item: string, index: number) => (
              <Typography key={index} sx={{ fontSize: 14 }}>
                {item}
              </Typography>
            ))}
          </div>
        ),
      },
      {
        field: "remainBandwidth",
        headerName: headerColumnText.REMAINING_BANDWIDTH,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const resourceRows = useMemo<Rows<ResourceModel>>(
    () =>
      resources?.data.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        roles: item.roles?.map((role) => role.title),
        hardSkills: item.hardSkills.map((skill) => skill.title),
        yearsOfExperience: item.yearsOfExperience,
        currentProjects: dumbCurrentProjects.map((project) => project.name),
        projectsEndDate: dumbCurrentProjects.map((project) => moment(project.endDate).format("MMM Do YYYY")),
        remainBandwidth: item.remainBandwidth,
      })) || [],
    [resources]
  );

  const handleTableChange = useCallback(
    (data: TableOnChangeData<ResourceModel>) => {
      const { page, pageSize } = data;
      const sort = data.sort[0];
      let order: "ASC" | "DESC" | undefined;
      let orderBy: keyof ResourceModel | undefined;
      switch (sort?.sort) {
        case "asc":
          order = "ASC";
          orderBy = sort.field;
          break;
        case "desc":
          order = "DESC";
          orderBy = sort.field;
          break;
        default:
          order = undefined;
          orderBy = undefined;
          break;
      }
      setFilterData((prev: SFilter) => ({
        ...prev,
        page,
        pageSize,
        order,
        orderBy,
      }));
    },
    [setFilterData]
  );

  return (
    <Box
      sx={{
        minHeight: 630,
        width: "100%",
        p: "4px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Button
        variant="text"
        onClick={() => setIsSearchFormCollapse((prev: boolean) => !prev)}
        sx={{
          minWidth: 32,
          width: 16,
          height: 32,
          alignSelf: "flex-end",
        }}
      >
        {isSearchFormCollapse ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
      </Button>

      <DatagridC
        columns={resourceColumns}
        getRowHeight={() => "auto"}
        rows={resourceRows}
        loading={isFetching}
        rowCount={resources?.count ?? -1}
        onChange={handleTableChange}
        page={filterData?.page}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = resourceRows.filter((row) => selectedIDs.has(row.id));
          const data = selectedRowData.map((item) => +item.id);
          setSelectedResources(data);
        }}
      />
    </Box>
  );
};

export default ResourceTable;
