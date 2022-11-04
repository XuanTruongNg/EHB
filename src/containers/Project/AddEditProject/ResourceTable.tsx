import { Box } from "@mui/material";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";
import DatagridC, { TableOnChangeData } from "components/Datagrid";
import { resourceText } from "core/constant";
import { FilterParams } from "core/interface/api";
import { ResourceInProject as ResourceModel } from "core/interface/models";
import { TempProject } from "core/interface/project";
import { Columns, Rows } from "core/interface/table";

const { headerColumnText } = resourceText;

type SFilter = FilterParams<ResourceModel> | undefined;
interface Props {
  project: TempProject | undefined;
  isFetching: boolean;
  filterData: SFilter;
  setFilterData: (_filterData: SFilter) => void;
  setIsModalOpen: (_isOpen: boolean) => void;
}

const ResourceTable: FC<Props> = ({ project, isFetching, filterData, setFilterData, setIsModalOpen }) => {
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
        field: "joinedDate",
        headerName: headerColumnText.JOINED_DATE,
        flex: 1,
        sortable: false,
      },
      {
        field: "endDate",
        headerName: headerColumnText.END_DATE,
        flex: 1,
        sortable: false,
      },
      {
        field: "allocatedBandwidth",
        headerName: headerColumnText.ALLOCATED_BANDWIDTH,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const resourceRows = useMemo<Rows<ResourceModel>>(
    () =>
      project?.resourcesProjects?.map((item) => ({
        id: item.resources.id,
        name: item.resources.name,
        code: item.resources.code,
        remainBandwidth: item.resources.remainBandwidth,
        yearsOfExperience: item.resources.yearsOfExperience,
        uuid: item.resources.uuid,
        departments: item.resources.departments,
        roles: item.resources.roles?.map((role) => role.title),
        hardSkills: item.resources.hardSkills.map((skill) => skill.title),
        joinedDate: moment(item.startDate).format("DD-MM-YYYY"),
        endDate: moment(item.endDate).format("DD-MM-YYYY"),
        allocatedBandwidth: item.bandwidth,
      })) || [],
    [project]
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
    <Box sx={{ minHeight: 630, width: "100%" }}>
      <DatagridC
        columns={resourceColumns}
        rows={resourceRows}
        loading={isFetching}
        rowCount={project?.resourcesProjects?.length ?? -1}
        onChange={handleTableChange}
        page={filterData?.page}
        onRowClick={() => setIsModalOpen(true)}
      />
    </Box>
  );
};

export default ResourceTable;
