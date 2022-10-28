import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  addProjectPlaceholder,
  addProjectText,
  buttonText,
} from 'core/constant';
import { DatePickerC, FormWrapper, SelectC, TextFieldC } from 'core/form';
import { AddProject } from 'core/interface/project';
import { useCreateProject } from 'hooks/project';
import { useGetProjectType } from 'hooks/projectType';
import moment, { Moment } from 'moment';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dataToOptions } from 'util/';
import ModalWrapper from '../../../components/ModalWrapper';
import { addProjectSchema } from './formConfig';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddProjectModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [start, setStart] = useState<Moment>();
  const [end, setEnd] = useState<Moment>();
  const methods = useForm<AddProject>({
    resolver: yupResolver(addProjectSchema),
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
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: '32px', px: '64px' }}>
          <TextFieldC
            name="name"
            title={addProjectText.NAME}
            placeholder={addProjectPlaceholder.NAME}
            type="text"
            InputProps={{ sx: { width: '100%', minWidth: '50%' } }}
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
            <Typography sx={{ width: '200px' }}>
              {addProjectText.DURATION}
            </Typography>
            <DatePickerC
              name="startDate"
              maxDate={start}
              labelStyle={{ width: '0px' }}
              toolbarPlaceholder={addProjectPlaceholder.START_DATE}
              onChange={(date) => {
                if (!date || !date.isValid()) {
                  setEnd(undefined);
                } else {
                  setEnd(date.add(1, 'days'));
                }
              }}
            />
            <DatePickerC
              name="endDate"
              minDate={end}
              labelStyle={{ width: '60px', margin: '0 0 0 40px' }}
              title={addProjectText.END_DATE}
              toolbarPlaceholder={addProjectPlaceholder.END_DATE}
              onChange={(date) => {
                if (!date || !date.isValid()) {
                  setStart(undefined);
                } else {
                  setStart(date.subtract(1, 'days'));
                }
              }}
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
