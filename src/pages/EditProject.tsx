import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { FormWrapper, TextFieldC, SelectC, DatePickerC } from 'core/form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { dataToOptions } from 'util/';
import { IEditProject, TempProject } from 'core/interface/project';
import { useGetProjectById, useGetProjectType, useUpdateProject } from 'hooks';
import {
  editProjectText,
  buttonText,
  PROJECT,
  HEADER_MARGIN,
  PAGE_HEADER_MARGIN,
  ASSIGN,
} from 'core/constant';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatagridC, { TableOnChangeData } from 'components/Datagrid';
import { ResourceInProject as ResourceModel } from 'core/interface/models';
import { FilterParams, PaginationData } from 'core/interface/api';
import { Columns, Rows } from 'core/interface/table';
import { resourceText } from 'core/constant/resource';
import moment from 'moment';
import EditMemberModal from 'containers/EditMemberModal';

const { headerColumnText } = resourceText;

interface EditProjectProps {}

const schema = yup.object({
  name: yup.string().required().label('Project name'),
  code: yup.string().required().label('Project code'),
  projectManagerId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Project Manager')
    .nullable(),
  startDate: yup
    .date()
    .max(yup.ref('endDate'), "Start date can't be after end date")
    .typeError('Invalid date!'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), "End date can't be before start date")
    .typeError('Invalid date!'),
  projectTypeId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Project Type')
    .nullable(),
});

type SPagination = PaginationData<ResourceModel> | undefined;
type SFilter = FilterParams<ResourceModel> | undefined;

const EditProject: React.FunctionComponent<EditProjectProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<SPagination>(undefined);
  const [filterData, setFilterData] = useState<SFilter>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const methods = useForm<IEditProject>({ resolver: yupResolver(schema) });
  const { data: projectTypes } = useGetProjectType();
  const updateProject = useUpdateProject();
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const { id } = useParams<{ id: string }>();

  const { data } = useGetProjectById({
    id: Number(id) || undefined,
  });

  const projectTypeData = useMemo(
    () => dataToOptions(projectTypes, 'name', 'id'),
    [projectTypes]
  );

  const handleReset = useCallback(
    (data: TempProject | undefined) => {
      if (typeof data == 'undefined') {
        return;
      }
      methods.reset({
        code: data.code,
        name: data.name,
        projectManagerId: data.projectManager.id,
        projectTypeId: data.projectTypes.id,
        startDate: data.startDate,
        endDate: data.endDate,
        // totalMembers: data.resourcesProjects.length,
      });
    },
    [methods]
  );

  //TODO add column current project, project end date
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
        field: 'joinedDate',
        headerName: headerColumnText.JOINED_DATE,
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
        field: 'allocatedBandwidth',
        headerName: headerColumnText.BANDWIDTH,
        flex: 1,
        sortable: false,
      },
    ],
    []
  );

  const resourceRows = useMemo<Rows<ResourceModel>>(
    () =>
      data?.resourcesProjects?.map((item) => {
        return {
          id: item.resources.id,
          name: item.resources.name,
          code: item.resources.code,
          remainBandwidth: item.resources.remainBandwidth,
          yearsOfExperience: item.resources.yearsOfExperience,
          uuid: item.resources.uuid,
          departments: item.resources.departments,
          resourcesRoles: item.resources.resourcesRoles.title,
          hardSkills: item.resources.hardSkills,
          joinedDate: moment(item.startDate).format('DD-MM-YYYY'),
          endDate: moment(item.endDate).format('DD-MM-YYYY'),
          allocatedBandwidth: item.bandwidth,
        };
      }) || [],
    [data]
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
    setFilterData({ ...paginationData });
  }, [paginationData]);

  useEffect(() => {
    if (data) {
      handleReset(data);
    }
  }, [data, handleReset, methods]);

  const onSubmit = (data: IEditProject) => {
    if (!id) return;
    updateProject({ ...data, id: Number(id) });
  };

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          px: '20px',
          height: 60,
          borderBottom: '1px solid #C1C1C1',
        }}
      >
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(PROJECT)}
        />

        <Box sx={{ display: 'flex', gap: 4 }}>
          <TextFieldC
            labelStyle={{ width: 0 }}
            name="code"
            sx={{ width: '100%', maxWidth: 150 }}
            InputProps={{ style: { fontWeight: 'bold', height: 30 } }}
            disabled={isDisabled}
          />
          <TextFieldC
            labelStyle={{ width: 0 }}
            name="name"
            sx={{ width: '100%', maxWidth: 150 }}
            InputProps={{ style: { fontWeight: 'bold', height: 30 } }}
            disabled={isDisabled}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px',
          p: '32px',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}px)`,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 15,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              <TextFieldC
                name="projectManagerId"
                title={editProjectText.PROJECT_MANAGER}
                labelStyle={{ width: '130px', fontWeight: 600 }}
                sx={{ marginLeft: 2, width: 200 }}
                disabled={isDisabled}
              />
              <SelectC
                name="projectTypeId"
                title={editProjectText.PROJECT_TYPE}
                sx={{ width: 200, marginLeft: 2 }}
                labelStyle={{ width: '130px', fontWeight: 600 }}
                options={projectTypeData}
                disabled={isDisabled}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <DatePickerC
                  labelStyle={{ width: '90px', fontWeight: 600 }}
                  inputStyle={{ marginLeft: 2, marginRight: 2 }}
                  title={editProjectText.DURATION}
                  name="startDate"
                  disabled={isDisabled}
                  maxDate={start}
                  onChange={(date) => setEnd(date || undefined)}
                />
                <DatePickerC
                  labelStyle={{ width: 'auto' }}
                  inputStyle={{ marginLeft: 2 }}
                  title={editProjectText.END_DATE}
                  name="endDate"
                  disabled={isDisabled}
                  minDate={end}
                  onChange={(date) => setStart(date || undefined)}
                />
              </Box>
              <TextFieldC
                title={'Total members'}
                type="text"
                disabled={isDisabled}
                value={data?.resourcesProjects.length || 0}
                labelStyle={{ width: '130px', fontWeight: 600 }}
                sx={{
                  '& fieldset': { border: 'none' },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000',
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingRight: '4%',
            }}
          >
            {isDisabled ? (
              <Button
                sx={{
                  backgroundColor: 'secondary.main',
                  ':hover': {
                    backgroundColor: 'secondary.main',
                    opacity: 0.8,
                  },
                  width: '200px',
                  fontSize: '16px',
                }}
                onClick={() => setIsDisabled(!isDisabled)}
              >
                {buttonText.EDIT_PROJECT}
              </Button>
            ) : null}
            {!isDisabled ? (
              <Button
                sx={{
                  backgroundColor: 'secondary.main',
                  ':hover': {
                    backgroundColor: 'secondary.main',
                    opacity: 0.8,
                  },
                  width: '200px',
                  fontSize: '16px',
                }}
                onClick={() => navigate(`${PROJECT}/${id}${ASSIGN}`)}
              >
                {buttonText.ADD_NEW_MEMBER}
              </Button>
            ) : null}
          </Box>
        </Box>

        <Box sx={{ minHeight: 630, width: '100%' }}>
          <DatagridC
            columns={resourceColumns}
            rows={resourceRows}
            loading={false}
            rowCount={data?.resourcesProjects?.length ?? -1}
            onChange={handleTableChange}
            page={filterData?.page}
            onRowClick={() => setIsOpen((isOpen) => !isOpen)}
          />
        </Box>

        {!isDisabled ? (
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'end',
              paddingRight: 2,
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
              onClick={() => {
                setIsDisabled(true);
                handleReset(data);
              }}
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
              type="submit"
            >
              {buttonText.SAVE}
            </Button>
          </Box>
        ) : null}
      </Box>
      <EditMemberModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </FormWrapper>
  );
};

export default EditProject;
