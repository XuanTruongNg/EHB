import FormWrapper from 'core/form/FormWrapper';
import TextFieldC from 'core/form/TextField';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from '../components/ModalWrapper';
import { Button, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import { buttonText } from 'core/constant';
import {
  useGetDepartment,
  useGetHardSkill,
  useGetRole,
  useCreateResource,
} from 'hooks';
import SelectC from 'core/form/Select';
import SelectMultipleC from 'core/form/SelectMultiple';
import { addResourceText, addResourcePlaceholder } from 'core/constant';
import uuid from 'react-uuid';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface AddResourceI {
  resourceName: string;
  departmentId: number;
  hardSkillIds: number[];
  yearsOfExperience: number;
}

const AddResourceModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const methods = useForm<AddResourceI>({});
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

  const onSubmit = (data: AddResourceI) => {
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
            name="resourceName"
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
            defaultValue={0}
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
