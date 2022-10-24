import { Box, Button } from '@mui/material';
import DatagridC, { TableOnChangeData } from 'components/Datagrid';
import PageHeader from 'components/PageHeader';
import SearchBar from 'components/SearchBar';
import AddProjectModal from 'containers/Project/AddProject';
import { buttonText, pageHeaderText, PROJECT } from 'core/constant';
import { projectText } from 'core/constant/project';
import { HEADER_MARGIN, PAGE_HEADER_MARGIN } from 'core/constant/spacing';
import { FilterParams, PaginationData } from 'core/interface/api';
import { Project as ProjectModel } from 'core/interface/models';
import { Columns, Rows } from 'core/interface/table';
import { useGetProject } from 'hooks';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { headerColumnText } = projectText;

type SPagination = PaginationData<ProjectModel> | undefined;
type SFilter = FilterParams<ProjectModel> | undefined;

const Project = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchData, setSearchData] = useState<string | undefined>(undefined);

  const [paginationData, setPaginationData] = useState<SPagination>(undefined);
  const [filterData, setFilterData] = useState<SFilter>(undefined);
  const navigate = useNavigate();

  const { data: projects, isFetching } = useGetProject(filterData);

  const projectColumns = useMemo<Columns<ProjectModel>>(
    () => [
      {
        field: 'code',
        headerName: headerColumnText.CODE,
        flex: 1,
        cellClassName: 'FirstColumn-DataGrid',
        headerClassName: 'FirstColumn-DataGrid',
      },
      {
        field: 'name',
        headerName: headerColumnText.PROJECT_NAME,
        flex: 1,
      },
      {
        field: 'projectManager',
        headerName: headerColumnText.PROJECT_MANAGER,
        flex: 1,
      },
      {
        field: 'resourcesProjects',
        headerName: headerColumnText.ASSIGNED_RESOURCES,
        flex: 1,
        sortable: false,
      },
      {
        field: 'startDate',
        headerName: headerColumnText.START_DATE,
        flex: 1,
        sortable: false,
      },
      {
        field: 'endDate',
        headerName: headerColumnText.END_DATE,
        flex: 1,
        sortable: false,
      },
      {
        field: 'projectTypes',
        headerName: headerColumnText.PROJECT_TYPE,
        flex: 1,
        sortable: false,
      },
      {
        field: 'creator',
        headerName: headerColumnText.CREATED_BY,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const projectRows = useMemo<Rows<ProjectModel>>(
    () =>
      projects?.data.map((item) => {
        return {
          id: item.id,
          code: item.code,
          name: item.name,
          projectManager: item.projectManager.name,
          resourcesProjects: item.resourcesProjects.length,
          startDate: moment(item.startDate).format('DD-MM-YYYY'),
          endDate: moment(item.endDate).format('DD-MM-YYYY'),
          projectTypes: item.projectTypes.name,
          creator: item.creator.name,
        };
      }) || [],
    [projects]
  );

  const handleTableChange = useCallback(
    (data: TableOnChangeData<ProjectModel>) => {
      const { page, pageSize } = data;
      const sort = data.sort[0];
      let order: 'ASC' | 'DESC' | undefined;
      let orderBy: keyof ProjectModel | undefined;
      switch (sort?.sort) {
        case 'asc':
          order = 'ASC';
          orderBy = sort.field;
          break;
        case 'desc':
          order = 'DESC';
          orderBy = sort.field;
          break;
        default:
          order = undefined;
          orderBy = undefined;
          break;
      }
      setPaginationData({ page, pageSize, order, orderBy });
    },
    []
  );

  const handleSearch = useCallback((searchData: string) => {
    setSearchData(searchData || undefined);
  }, []);

  useEffect(() => {
    setFilterData({ ...paginationData, searchData });
  }, [paginationData, searchData]);

  return (
    <>
      <PageHeader title={pageHeaderText.PROJECTS} height={60} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px',
          p: '32px',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}%)`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{
              backgroundColor: 'secondary.main',
              ':hover': {
                backgroundColor: 'secondary.main',
                opacity: 0.8,
              },
            }}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {buttonText.ADD_PROJECT}
          </Button>

          <SearchBar onChange={handleSearch} />
        </Box>
        <Box sx={{ minHeight: 620, width: '100%' }}>
          <DatagridC
            columns={projectColumns}
            rows={projectRows}
            loading={isFetching}
            rowCount={projects?.count ?? -1}
            onChange={handleTableChange}
            page={filterData?.page}
            onRowClick={(params) => navigate(`${PROJECT}/${params.row.id}`)}
          />
        </Box>
      </Box>
      <AddProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Project;
