import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  addResourceText,
  buttonText,
  editResourceText,
  resourcePlaceholder,
} from 'core/constant';
import FormWrapper from 'core/form/FormWrapper';
import SelectC from 'core/form/Select';
import SelectMultipleC from 'core/form/SelectMultiple';
import TextFieldC from 'core/form/TextField';
import { AddResource, EditResource } from 'core/interface/resource';
import {
  useCreateResource,
  useGetDepartment,
  useGetHardSkill,
  useGetResourceById,
  useGetRole,
  useUpdateResource,
} from 'hooks';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import { dataToOptions } from 'util/data';
import * as yup from 'yup';
import ModalWrapper from '../components/ModalWrapper';

type Props =
  | {
      isOpen: boolean;
      modelControl: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
      type: 'EDIT';
      id: number;
    }
  | {
      isOpen: boolean;
      modelControl: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
      type: 'ADD';
      id: undefined;
    };

export const resourceSchema = yup.object({
  name: yup.string().required().label('Resource name'),
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

const ResourceModal: FC<Props> = ({
  isOpen,
  modelControl: controlModal,
  type,
  id,
}) => {
  const methods = useForm<AddResource | EditResource>({
    resolver: yupResolver(resourceSchema),
  });

  const { data: editedResource } = useGetResourceById(id);
  const updateResource = useUpdateResource();

  const { data: departments } = useGetDepartment();
  const { data: roles } = useGetRole();
  const { data: hardSkills } = useGetHardSkill();

  const closeHandler = useCallback(() => {
    controlModal(null);
    methods.reset();
  }, [controlModal, methods]);

  const departmentData = useMemo(
    () => dataToOptions(departments, 'title', 'id'),
    [departments]
  );

  const roleData = useMemo(() => dataToOptions(roles, 'title', 'id'), [roles]);

  const skillData = useMemo(
    () => dataToOptions(hardSkills, 'title', 'id'),
    [hardSkills]
  );

  const addResource = useCreateResource();

  const onSubmit = async (data: AddResource | EditResource) => {
    switch (type) {
      case 'ADD':
        //TODO handle get uuid later
        const randomUuid: string = uuid();
        await addResource({ ...data, uuid: randomUuid });
        break;
      case 'EDIT':
        if ('code' in data) {
          delete data.code;
          await updateResource({ ...data, id: id });
        }
        break;
    }
    closeHandler();
  };

  useEffect(() => {
    if (type === 'EDIT' && editedResource && isOpen) {
      methods.setValue('name', editedResource.name);
      methods.setValue('code', editedResource.code);
      methods.setValue('departmentId', editedResource.departments.id);
      methods.setValue('roleId', editedResource.resourcesRoles.id);
      methods.setValue(
        'hardSkillIds',
        editedResource.resourcesHardSkills.map((item) => item.hardSkills.id)
      );
      methods.setValue('yearsOfExperience', editedResource.yearsOfExperience);
    }
    return () => {};
  }, [editedResource, isOpen, methods, type]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={closeHandler}
      title={type === 'ADD' ? addResourceText.TITLE : editResourceText.TITLE}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          cursor: 'pointer',
        }}
        onClick={closeHandler}
      >
        <ClearIcon />
      </Box>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: '32px', px: '64px' }}>
          <TextFieldC
            name="name"
            title={addResourceText.NAME}
            placeholder={resourcePlaceholder.NAME}
            type="text"
          />
          {type === 'EDIT' && (
            <TextFieldC
              name="code"
              title={editResourceText.CODE}
              type="text"
              disabled={true}
              sx={{
                '& fieldset': { border: 'none' },
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#000',
                },
              }}
            />
          )}
          <SelectC
            name="departmentId"
            title={addResourceText.DEPARTMENT}
            placeholder={resourcePlaceholder.DEPARTMENT}
            options={departmentData}
          />
          <SelectC
            name="roleId"
            title={addResourceText.ROLE}
            placeholder={resourcePlaceholder.ROLE}
            options={roleData}
          />
          <SelectMultipleC
            name="hardSkillIds"
            title={addResourceText.HARD_SKILLS}
            placeholder={resourcePlaceholder.HARD_SKILLS}
            options={skillData}
          />
          <TextFieldC
            name="yearsOfExperience"
            title={addResourceText.YOE}
            placeholder={resourcePlaceholder.YOE}
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
            onClick={closeHandler}
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
            {type === 'ADD' ? buttonText.ADD_NEW : buttonText.SAVE}
          </Button>
        </Box>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default ResourceModal;
