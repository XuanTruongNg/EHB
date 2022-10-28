import { Box } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";
import { FC, useCallback, useMemo } from "react";
import DatagridC, { TableOnChangeData } from "components/Datagrid";
import { resourceText } from "core/constant";
import { FilterParams } from "core/interface/api";
import { Resource as ResourceModel } from "core/interface/models";
import { ResourcesResponse } from "core/interface/resource";
import { Columns, Rows } from "core/interface/table";

const { headerColumnText } = resourceText;

type SFilter = FilterParams<ResourceModel> | undefined;
interface Props {
  resources: ResourcesResponse | undefined;
  isFetching: boolean;
  onCellClick: (params: GridCellParams) => void;
  filterData: SFilter;
  setFilterData: (filterData: SFilter) => void;
}

const ResourceTable: FC<Props> = ({ resources, isFetching, onCellClick, filterData, setFilterData }) => {
  const resourceColumns = useMemo<Columns<ResourceModel>>(
    () => [
      {
        field: "code",
        headerName: headerColumnText.CODE,
        flex: 1,
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
        field: "departments",
        headerName: headerColumnText.DEPARTMENT,
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
    ],
    []
  );

  const resourceRows = useMemo<Rows<ResourceModel>>(
    () =>
      resources?.data.map((item) => ({
        ...item,
        departments: item.departments?.title,
        hardSkills: item.hardSkills?.map((skill) => skill.title),
        roles: item.roles?.map((role) => role.title),
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
    <Box sx={{ width: "100%", height: 630 }}>
      <DatagridC
        columns={resourceColumns}
        rows={resourceRows}
        loading={isFetching}
        onCellClick={onCellClick}
        rowCount={resources?.count ?? -1}
        onChange={handleTableChange}
        page={filterData?.page}
      />
    </Box>
  );
};

export default ResourceTable;
