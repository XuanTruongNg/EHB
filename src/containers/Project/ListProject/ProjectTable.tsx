import { Box } from "@mui/material";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DatagridC, { TableOnChangeData } from "components/Datagrid";
import { PROJECT, projectText } from "core/constant";
import { FilterParams } from "core/interface/api";
import { Project as ProjectModel } from "core/interface/models";
import { ProjectsResponse } from "core/interface/project";
import { Columns, Rows } from "core/interface/table";

const { headerColumnText } = projectText;

type SFilter = FilterParams<ProjectModel> | undefined;
interface Props {
  projects: ProjectsResponse | undefined;
  isFetching: boolean;
  filterData: SFilter;
  setFilterData: (filterData: SFilter) => void;
}

const ProjectTable: FC<Props> = ({ isFetching, projects, filterData, setFilterData }) => {
  const navigate = useNavigate();

  const projectColumns = useMemo<Columns<ProjectModel>>(
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
        headerName: headerColumnText.PROJECT_NAME,
        flex: 1,
      },
      {
        field: "projectManager",
        headerName: headerColumnText.PROJECT_MANAGER,
        flex: 1,
      },
      {
        field: "resourcesProjects",
        headerName: headerColumnText.ASSIGNED_RESOURCES,
        flex: 1,
        sortable: false,
      },
      {
        field: "startDate",
        headerName: headerColumnText.START_DATE,
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
        field: "projectTypes",
        headerName: headerColumnText.PROJECT_TYPE,
        flex: 1,
        sortable: false,
      },
      {
        field: "creator",
        headerName: headerColumnText.CREATED_BY,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const projectRows = useMemo<Rows<ProjectModel>>(
    () =>
      projects?.data.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        projectManager: item.projectManager.name,
        resourcesProjects: item.resourcesProjects.length,
        startDate: moment(item.startDate).format("DD-MM-YYYY"),
        endDate: moment(item.endDate).format("DD-MM-YYYY"),
        projectTypes: item.projectTypes.name,
        creator: item.creator.name,
      })) || [],
    [projects]
  );

  const handleTableChange = useCallback(
    (data: TableOnChangeData<ProjectModel>) => {
      const { page, pageSize } = data;
      const sort = data.sort[0];
      let order: "ASC" | "DESC" | undefined;
      let orderBy: keyof ProjectModel | undefined;
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
    <Box sx={{ minHeight: 620, width: "100%" }}>
      <DatagridC
        columns={projectColumns}
        rows={projectRows}
        loading={isFetching}
        rowCount={projects?.count ?? -1}
        onChange={handleTableChange}
        page={filterData?.page}
        onCellClick={(params) => navigate(`${PROJECT}/${params.row.id}`)}
      />
    </Box>
  );
};

export default ProjectTable;
