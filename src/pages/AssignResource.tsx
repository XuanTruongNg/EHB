import { Box, Button, Slide, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  buttonText,
  HEADER_MARGIN,
  pageHeaderText,
  PAGE_HEADER_MARGIN,
} from 'core/constant';
import { useForm } from 'react-hook-form';
import { SliderC, AutocompleteC, FormWrapper, SelectC } from 'core/form';
import {
  assignResourcePlaceholder,
  assignResourceText,
  resourceText,
} from 'core/constant/resource';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Columns, Rows } from 'core/interface/table';
import { Resource as ResourceModel } from 'core/interface/models';
import { FilterParams, PaginationData } from 'core/interface/api';
import {
  useAddResourcesToProject,
  useGetHardSkill,
  useGetResource,
  useGetRole,
} from 'hooks';
import { dataToOptions } from '../util';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DatagridC, { TableOnChangeData } from 'components/Datagrid';
import moment from 'moment';
import {
  FilterResources,
  SearchResourcesParams,
} from 'core/interface/resource';

const { headerColumnText } = resourceText;

type SPagination = PaginationData<ResourceModel> | undefined;
type SFilter = FilterParams<ResourceModel> | undefined;

//TODO if resource doesn't have current project
const dumbCurrentProjects = [
  {
    id: 1,
    name: 'project 1',
    code: 'dumb',
    startDate: '10-10-2022',
    endDate: '10-20-2022',
  },
  {
    id: 2,
    name: 'project 2',
    code: 'dumb2',
    startDate: '10-10-2022',
    endDate: '10-20-2023',
  },
];

const AssignResource = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<
    SearchResourcesParams | undefined
  >(undefined);
  const [paginationData, setPaginationData] = useState<SPagination>(undefined);
  const [filterData, setFilterData] = useState<SFilter>(undefined);
  const [isCollapse, setCollapse] = useState(false);
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();

  const { data: hardSkills } = useGetHardSkill();
  const skillData = useMemo(
    () => dataToOptions(hardSkills, 'title', 'id'),
    [hardSkills]
  );

  const { data: roles } = useGetRole();
  const roleData = useMemo(() => dataToOptions(roles, 'title', 'id'), [roles]);

  const { data: resources, isFetching } = useGetResource(filterData);

  const methods = useForm<FilterResources>();

  const addMembersToProject = useAddResourcesToProject();

  const resourceColumns = useMemo<Columns<ResourceModel>>(
    () => [
      {
        field: 'code',
        headerName: headerColumnText.CODE,
        flex: 0.5,
        cellClassName: 'FirstColumn-DataGrid',
        headerClassName: 'FirstColumn-DataGrid',
      },
      {
        field: 'name',
        headerName: headerColumnText.RESOURCE_NAME,
        flex: 1,
      },
      {
        field: 'roles',
        headerName: headerColumnText.ROLE,
        flex: 1,
      },
      {
        field: 'hardSkills',
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
      {
        field: 'currentProjects',
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
        type: 'string',
      },
      {
        field: 'projectsEndDate',
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
        field: 'remainBandwidth',
        headerName: headerColumnText.REMAINING_BANDWIDTH,
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
          id: item.id,
          code: item.code,
          name: item.name,
          roles: item.roles.map((role) => role.title),
          hardSkills: item.hardSkills.map((skill) => skill.title),
          yearsOfExperience: item.yearsOfExperience,
          currentProjects: dumbCurrentProjects.map((project) => project.name),
          projectsEndDate: dumbCurrentProjects.map((project) =>
            moment(project.endDate).format('MMM Do YYYY')
          ),
          remainBandwidth: item.remainBandwidth,
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

  useEffect(() => {
    setFilterData({ ...paginationData, ...searchData });
  }, [paginationData, searchData]);

  const handleAssignResources = () => {
    addMembersToProject({
      id: Number(id),
      resourceIdList: selectedResources,
    });
    navigate(-1);
  };

  const handleSearch = (data: FilterResources) => {
    const searchParams = {
      roleId: data.roleIds,
      skillIdList: data.hardSkillIds,
      minExp: data.yearsOfExperience[0],
      maxExp: data.yearsOfExperience[1],
    };

    setSearchData(searchParams);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          px: '32px',
          height: '60px',
          borderBottom: '1px solid #C1C1C1',
        }}
      >
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
          {pageHeaderText.ASSIGN_RESOURCES}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}px)`,
        }}
      >
        <Slide direction="down" in={!isCollapse} mountOnEnter unmountOnExit>
          <Box
            sx={{
              p: '32px',
              borderBottom: '1px solid',
              borderColor: 'secondary.light',
            }}
          >
            <FormWrapper onSubmit={handleSearch} methods={methods}>
              <Stack spacing={2}>
                <SelectC
                  name="roleId"
                  title={assignResourceText.ROLE}
                  placeholder={assignResourcePlaceholder.ROLE}
                  options={roleData}
                />
                <AutocompleteC
                  name="hardSkillIds"
                  title={assignResourceText.SKILLS}
                  placeholder={assignResourcePlaceholder.SKILLS}
                  options={skillData}
                  multiple
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '65%',
                  }}
                >
                  <SliderC
                    name="yearsOfExperience"
                    title={assignResourceText.YOE}
                  />
                  <Button type="submit">Search</Button>
                </Box>
              </Stack>
            </FormWrapper>
          </Box>
        </Slide>

        <Box
          sx={{
            minHeight: 630,
            width: '100%',
            p: '4px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Button
            variant="text"
            onClick={() => setCollapse((prev) => !prev)}
            sx={{
              minWidth: 32,
              width: 16,
              height: 32,
              alignSelf: 'flex-end',
            }}
          >
            {isCollapse ? (
              <KeyboardDoubleArrowDownIcon />
            ) : (
              <KeyboardDoubleArrowUpIcon />
            )}
          </Button>

          <DatagridC
            columns={resourceColumns}
            getRowHeight={() => 'auto'}
            rows={resourceRows}
            loading={isFetching}
            rowCount={resources?.count ?? -1}
            onChange={handleTableChange}
            page={filterData?.page}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = resourceRows.filter((row) => {
                return selectedIDs.has(row.id);
              });
              const data = selectedRowData.map((item) => item.id);
              setSelectedResources(data);
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'end',
            p: '32px',
          }}
        >
          <Button
            sx={{
              backgroundColor: 'secondary.light',
              ':hover': {
                backgroundColor: 'secondary.light',
                opacity: 0.8,
              },
              width: '150px',
              fontSize: '16px',
            }}
            type="button"
            // onClick={() => handleReset(data)}
          >
            {buttonText.CANCEL}
          </Button>

          <Button
            sx={{
              backgroundColor: 'secondary.main',
              ':hover': {
                backgroundColor: 'secondary.main',
                opacity: 0.8,
              },
              width: '150px',
              fontSize: '16px',
            }}
            onClick={handleAssignResources}
          >
            {buttonText.ASSIGN}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssignResource;
