import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormWrapper from 'core/form/FormWrapper';
import { useForm } from 'react-hook-form';
import TextFieldC from 'core/form/TextField';
import SelectC from 'core/form/Select';
import DatePickerC from 'core/form/Datepicker';
import { useEffect, useMemo } from 'react';
import { dataToOptions } from 'util/';
import { IEditProject } from 'core/interface/project';
import { useGetProjectById, useGetProjectType, useUpdateProject } from 'hooks';

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

const EditProject: React.FunctionComponent<EditProjectProps> = () => {
  const navigate = useNavigate();
  const methods = useForm<IEditProject>({});
  const { data: projectTypes } = useGetProjectType();
  const updateProject = useUpdateProject();

  const { id } = useParams<{ id: string }>();

  const { data } = useGetProjectById({
    id: Number(id) || undefined,
  });

  const projectTypeData = useMemo(
    () => dataToOptions(projectTypes, 'name', 'id'),
    [projectTypes]
  );

  useEffect(() => {
    if (data) {
      methods.reset({
        code: data.code,
        name: data.name,
        projectManagerId: data.projectManager.id,
        projectTypeId: data.projectTypes.id,
        startDate: data.startDate,
        endDate: data.endDate,
        // totalMembers: data.resourcesProjects.length,
      });
    }
  }, [data, methods]);

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
            gap: '16px',
            px: '32px',
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
              size="small"
              sx={{ width: 100 }}
            />
            <TextFieldC
              labelStyle={{ width: 0 }}
              name="name"
              size="small"
              sx={{ width: 100 }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', padding: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
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
                title="Project Manager"
                size="small"
                labelStyle={{ width: '130px' }}
                sx={{ marginLeft: 2, width: 200 }}
              />
              <SelectC
                name="projectTypeId"
                title="Project Type"
                size="small"
                sx={{ width: 200, marginLeft: 2 }}
                labelStyle={{ width: '130px' }}
                options={projectTypeData}
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
                  labelStyle={{ width: '90px' }}
                  title="Duration"
                  name="startDate"
                  inputStyle={{ marginLeft: 2, marginRight: 2 }}
                />
                <DatePickerC
                  labelStyle={{ width: 'auto' }}
                  inputStyle={{ marginLeft: 2 }}
                  title="to"
                  name="endDate"
                />
              </Box>
              <TextFieldC
                title={'Total members'}
                type="text"
                disabled={true}
                value={data?.resourcesProjects.length || 0}
                sx={{
                  '& fieldset': { border: 'none' },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000',
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ flex: '1 1 0%', display: 'flex' }}>
            <Button color="secondary">Add new member</Button>
          </Box>
        </Box>
        <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
        <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: 20 }}>
          <Button type="submit" color="secondary">
            Save
          </Button>
        </Box>
      </FormWrapper>
    </>
  );
};

export default EditProject;
