import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  addResourcePlaceholder,
  addResourceText,
  buttonText,
} from 'core/constant';
import FormWrapper from 'core/form/FormWrapper';
import SelectC from 'core/form/Select';
import SelectMultipleC from 'core/form/SelectMultiple';
import TextFieldC from 'core/form/TextField';
import { AddResource } from 'core/interface/resource';
import {
  useCreateResource,
  useGetDepartment,
  useGetHardSkill,
  useGetRole,
} from 'hooks';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import ModalWrapper from '../components/ModalWrapper';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const schema = yup.object({
  name: yup.string().min(5).label('Resouce name'),
  departmentId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Department')
    .nullable(),
  roleId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Role')
    .nullable(),
  hardSkillIds: yup.array().min(1).label('Hard skills'),
  yearsOfExperience: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Years of experience')
    .min(0)
    .nullable(),
});
const AddResourceModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const methods = useForm<AddResource>({
    resolver: yupResolver(schema),
  });
  const { data: departments } = useGetDepartment();
  const { data: roles } = useGetRole();
  const { data: hardSkills } = useGetHardSkill();

  const departmentData = useMemo(
    () =>
      departments?.map((item) => {
        return { value: item.id, label: item.title };
      }),
    [departments]
  );

  const roleData = useMemo(
    () =>
      roles?.map((item) => {
        return { value: item.id, label: item.title };
      }),
    [roles]
  );

  const skillData = useMemo(
    () =>
      hardSkills?.map((item) => {
        return { value: item.id, label: item.title };
      }),
    [hardSkills]
  );

  const addResource = useCreateResource();

  const onSubmit = (data: AddResource) => {
    //TODO handle get uuid later
    const randomUuid: string = uuid();
    addResource({ ...data, uuid: randomUuid });
    setIsOpen(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title={addResourceText.TITLE}
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
            title={addResourceText.NAME}
            placeholder={addResourcePlaceholder.NAME}
            type="text"
          />
          <SelectC
            name="departmentId"
            title={addResourceText.DEPARTMENT}
            placeholder={addResourcePlaceholder.DEPARTMENT}
            options={departmentData || []}
          />
          <SelectC
            name="roleId"
            title={addResourceText.ROLE}
            placeholder={addResourcePlaceholder.ROLE}
            options={roleData || []}
          />
          <SelectMultipleC
            name="hardSkillIds"
            title={addResourceText.HARD_SKILLS}
            placeholder={addResourcePlaceholder.HARD_SKILLS}
            options={skillData || []}
          />
          <TextFieldC
            name="yearsOfExperience"
            title={addResourceText.YOE}
            placeholder={addResourcePlaceholder.YOE}
            type="number"
            sx={{ width: 200 }}
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

export default AddResourceModal;
