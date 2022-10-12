import { Box, Button } from '@mui/material';
import DatagridC, { TableOnChangeData } from 'components/Datagrid';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import AddResourceModal from 'containers/AddResourceModal';
import { buttonText, navBarText } from 'core/constant';
import { resourceText } from 'core/constant/resource';
import { HEADER_MARGIN } from 'core/constant/spacing';
import { FilterParams, PaginationData } from 'core/interface/api';
import { Resource as ResourceModel } from 'core/interface/models';
import { Columns, Rows } from 'core/interface/table';
import { useGetResource } from 'hooks';
import { useCallback, useMemo, useState, useEffect } from 'react';

const { headerColumnText } = resourceText;

type SPagination = PaginationData<ResourceModel> | undefined;
type SFilter = FilterParams<ResourceModel> | undefined;

const Resource = () => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: find a better solution in future
  const [searchData, setSearchData] = useState<string | undefined>(undefined);
  const [paginationData, setPaginationData] = useState<SPagination>(undefined);
  const [filterData, setFilterData] = useState<SFilter>(undefined);

  const { data: resources, isFetching } = useGetResource(filterData);

  const resourceColumns = useMemo<Columns<ResourceModel>>(
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
        headerName: headerColumnText.RESOURCE_NAME,
        flex: 1,
      },
      {
        field: 'resourcesRoles',
        headerName: headerColumnText.ROLE,
        flex: 1,
      },
      {
        field: 'departments',
        headerName: headerColumnText.DEPARTMENT,
        flex: 1,
      },
      {
        field: 'resourcesHardSkills',
        headerName: headerColumnText.HARD_SKILLS,
        flex: 1,
        sortable: false,
      },
      {
        field: 'yearsOfExperience',
        headerName: headerColumnText.YEARS_EXP,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const resourceRows = useMemo<Rows<ResourceModel>>(
    () =>
      resources?.data.map((item) => {
        return {
          id: item.uuid,
          code: item.code,
          name: item.name,
          resourcesRoles: item.resourcesRoles.title,
          departments: item.departments.title,
          resourcesHardSkills: item.resourcesHardSkills.map(
            (item) => item.hardSkills.title
          ),
          yearsOfExperience: item.yearsOfExperience,
        };
      }) || [],
    [resources]
  );

  const handleTableChange = useCallback(
    (data: TableOnChangeData<ResourceModel>) => {
      const { page, pageSize } = data;
      const sort = data.sort[0];
      let order: 'ASC' | 'DESC' | undefined;
      let orderBy: keyof ResourceModel | undefined;
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
      <NavBar title={navBarText.RESOURCES} height={60} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px',
          p: '32px',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN}*2)`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="medium"
            sx={{
              backgroundColor: 'secondary.main',
              ':hover': {
                backgroundColor: 'secondary.main',
                opacity: 0.8,
              },
            }}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {buttonText.ADD_RESOURCE}
          </Button>

          <SearchBar onChange={handleSearch} />
        </Box>
        <Box sx={{ minHeight: 650, width: '100%' }}>
          <DatagridC
            columns={resourceColumns}
            rows={resourceRows}
            loading={isFetching}
            rowCount={resources?.count ?? -1}
            onChange={handleTableChange}
            page={filterData?.page}
          />
        </Box>
      </Box>
      <AddResourceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Resource;
