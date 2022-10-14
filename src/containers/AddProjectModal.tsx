import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  addProjectPlaceholder,
  addProjectText,
  buttonText,
} from 'core/constant';
import DatePickerC from 'core/form/Datepicker';
import FormWrapper from 'core/form/FormWrapper';
import SelectC from 'core/form/Select';
import TextFieldC from 'core/form/TextField';
import { AddProject } from 'core/interface/project';
import { useCreateProject } from 'hooks/project';
import { useGetProjectType } from 'hooks/projectType';
import moment from 'moment';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataToOptions } from 'util/';
import * as yup from 'yup';
import ModalWrapper from '../components/ModalWrapper';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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
  projectTypesId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Project Type')
    .nullable(),
});

const AddProjectModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const methods = useForm<AddProject>({
    resolver: yupResolver(schema),
  });
  const { data: projectTypes } = useGetProjectType();

  const projectTypeData = useMemo(
    () => dataToOptions(projectTypes, 'name', 'id'),
    [projectTypes]
  );

  const addProject = useCreateProject();

  const onSubmit = (data: AddProject) => {
    const startDate = moment(data.startDate.toString()).format('M-D-YYYY');
    const endDate = moment(data.endDate.toString()).format('M-D-YYYY');

    addProject({ ...data, startDate, endDate });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
  }, [isOpen, methods]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title={addProjectText.TITLE}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(false)}
      >
        <ClearIcon />
      </Box>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: '32px', px: '64px' }}>
          <TextFieldC
            name="name"
            title={addProjectText.NAME}
            placeholder={addProjectPlaceholder.NAME}
            type="text"
          />
          <TextFieldC
            name="code"
            title={addProjectText.CODE}
            placeholder={addProjectPlaceholder.CODE}
            type="text"
          />
          <TextFieldC
            name="projectManagerId"
            title={addProjectText.PROJECT_MANAGER}
            placeholder={addProjectPlaceholder.PROJECT_MANAGER}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DatePickerC
              name="startDate"
              maxDate={start}
              title={addProjectText.START_DATE}
              toolbarPlaceholder={addProjectPlaceholder.START_DATE}
              onAccept={(date: any) => setEnd(date)}
            />
            <DatePickerC
              name="endDate"
              minDate={end}
              title={addProjectText.END_DATE}
              onAccept={(date: any) => setStart(date)}
              toolbarPlaceholder={addProjectPlaceholder.END_DATE}
              labelStyle={{ width: '60px', margin: '0 0 0 40px' }}
            />
          </Box>

          <SelectC
            name="projectTypesId"
            title={addProjectText.TYPE}
            placeholder={addProjectPlaceholder.TYPE}
            options={projectTypeData || []}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '32px',
            p: '32px',
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
            }}
            onClick={() => setIsOpen(false)}
          >
            {buttonText.CANCEL}
          </Button>
          <Button
            size="medium"
            sx={{
              backgroundColor: 'primary.main',
              ':hover': {
                backgroundColor: 'primary.main',
                opacity: 0.8,
              },
            }}
            type="submit"
          >
            {buttonText.ADD_NEW}
          </Button>
        </Box>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default AddProjectModal;
