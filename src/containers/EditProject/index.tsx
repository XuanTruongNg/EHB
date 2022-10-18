import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormWrapper from 'core/form/FormWrapper';
import { useForm } from 'react-hook-form';
import TextFieldC from 'core/form/TextField';
import SelectC from 'core/form/Select';
import DatePickerC from 'core/form/Datepicker';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { dataToOptions } from 'util/';
import { IEditProject, TempProject } from 'core/interface/project';
import { useGetProjectById, useGetProjectType, useUpdateProject } from 'hooks';
import { editProjectText, buttonText } from 'core/constant';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditProjectProps {}

// interface EditProjectTable {
//   code: string;
//   name: string;
//   role: string;
//   hardSkill: string[];
//   yearsOfExperience: number;
//   joinDate: string;
//   leaveDate: string;
//   allocateBandwidth: number;
//   workingHours: number;
// }

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

const EditProject: React.FunctionComponent<EditProjectProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
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
    <>
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
            onClick={() => navigate('/project')}
          />

          <Box sx={{ display: 'flex', justifyContent: 'start', gap: '30px' }}>
            <TextFieldC
              labelStyle={{ width: 0 }}
              name="code"
              sx={{ width: '100%', minWidth: 150 }}
              InputProps={{ style: { fontWeight: 'bold', height: 30 } }}
              disabled={isDisabled}
            />
            <TextFieldC
              labelStyle={{ width: 0 }}
              name="name"
              sx={{ width: '100%', minWidth: 150 }}
              InputProps={{ style: { fontWeight: 'bold', height: 30 } }}
              disabled={isDisabled}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', padding: 3 }}>
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
                  onChange={(date: any) => setEnd(date || undefined)}
                />
                <DatePickerC
                  labelStyle={{ width: 'auto' }}
                  inputStyle={{ marginLeft: 2 }}
                  title={editProjectText.END_DATE}
                  name="endDate"
                  disabled={isDisabled}
                  minDate={end}
                  onChange={(date: any) => setStart(date || undefined)}
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
                size="medium"
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
                size="medium"
                sx={{
                  backgroundColor: 'secondary.main',
                  ':hover': {
                    backgroundColor: 'secondary.main',
                    opacity: 0.8,
                  },
                  width: '200px',
                  fontSize: '16px',
                }}
                // onClick={}
              >
                {buttonText.ADD_NEW_MEMBER}
              </Button>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ padding: 5 }}>{/* TODO Data Grid goes here */}</Box>
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
              size="medium"
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
              size="medium"
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
      </FormWrapper>
    </>
  );
};

export default EditProject;
