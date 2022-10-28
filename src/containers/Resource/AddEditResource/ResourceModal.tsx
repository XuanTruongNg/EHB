import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "components/ModalWrapper";
import { addResourceText, buttonText, editResourceText, resourcePlaceholder } from "core/constant";
import { FormWrapper, SelectC, AutocompleteC, TextFieldC } from "core/form";
import { AddResourceForm, EditResourceForm } from "core/interface/resource";
import {
  useCreateResource,
  useGetDepartment,
  useGetHardSkill,
  useGetResourceById,
  useGetRole,
  useUpdateResource,
} from "hooks";
import { dataToOptions } from "util/";
import { isAddResource } from "util/data";
import { addResourceModal, editResourceModal } from "./formConfig";

type Props = {
  isOpen: boolean;
  setModalControl: Dispatch<SetStateAction<"ADD" | "EDIT" | null>>;
  type: "EDIT" | "ADD" | null;
  id: number | undefined;
};

const ResourceModal: FC<Props> = ({ isOpen, setModalControl, type, id }) => {
  const methods = useForm<AddResourceForm | EditResourceForm>({
    resolver: yupResolver(type === "ADD" ? addResourceModal : editResourceModal),
  });

  const { resource: editedResource } = useGetResourceById(id);
  const updateResource = useUpdateResource();

  const { departments } = useGetDepartment();
  const { roles } = useGetRole();
  const { hardSkills } = useGetHardSkill();

  const closeHandler = useCallback(() => {
    setModalControl(null);
    methods.reset();
  }, [setModalControl, methods]);

  const departmentData = useMemo(() => dataToOptions(departments, "title", "id"), [departments]);

  const roleData = useMemo(() => dataToOptions(roles, "title", "id"), [roles]);

  const skillData = useMemo(() => dataToOptions(hardSkills, "title", "id"), [hardSkills]);

  const addResource = useCreateResource();

  const onSubmit = async (data: AddResourceForm | EditResourceForm) => {
    switch (type) {
      case "ADD":
        if (isAddResource(data)) {
          await addResource(data);
        }
        break;
      case "EDIT":
        if (!isAddResource(data) && id) {
          await updateResource({ data, id });
        }
        break;
      default:
    }
    closeHandler();
  };

  useEffect(() => {
    if (type === "EDIT" && editedResource && isOpen) {
      // methods.setValue('code', editedResource.code);
      // methods.setValue('uuid', editedResource.uuid);
      methods.setValue("phoneNumber", editedResource.phoneNumber);
      methods.setValue("displayName", editedResource.displayName);
      methods.setValue("email", editedResource.email);
      methods.setValue("name", editedResource?.name);
      methods.setValue("departmentId", editedResource?.departments?.id);
      methods.setValue("roleIds", editedResource.roles ? editedResource.roles.map((role) => role.id) : []);
      methods.setValue(
        "hardSkillIds",
        editedResource.hardSkills ? editedResource.hardSkills.map((skill) => skill.id) : []
      );
      methods.setValue("yearsOfExperience", editedResource.yearsOfExperience);
    }
  }, [editedResource, isOpen, methods, type]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={closeHandler}
      title={type === "ADD" ? addResourceText.TITLE : editResourceText.TITLE}
    >
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: "32px", px: "64px" }}>
          <TextFieldC name="name" title={addResourceText.NAME} placeholder={resourcePlaceholder.NAME} type="text" />
          {type === "EDIT" && (
            <TextFieldC
              name=""
              title={editResourceText.CODE}
              type="text"
              disabled={true}
              value={editedResource?.code || ""}
            />
          )}
          <TextFieldC
            name="displayName"
            title={addResourceText.DISPLAY_NAME}
            placeholder={resourcePlaceholder.NAME}
            type="text"
          />
          {type === "ADD" && (
            <TextFieldC name="uuid" title={addResourceText.UUID} placeholder={resourcePlaceholder.ID} type="text" />
          )}
          <TextFieldC
            name="phoneNumber"
            title={addResourceText.PHONE}
            placeholder={resourcePlaceholder.PHONE}
            type="text"
          />
          <TextFieldC name="email" title={addResourceText.EMAIL} placeholder={resourcePlaceholder.EMAIL} type="text" />
          <TextFieldC name="avatar" title={addResourceText.AVATAR} type="file" />

          <SelectC
            name="departmentId"
            title={addResourceText.DEPARTMENT}
            placeholder={resourcePlaceholder.DEPARTMENT}
            options={departmentData}
          />
          <AutocompleteC
            name="roleIds"
            title={addResourceText.ROLE}
            placeholder={resourcePlaceholder.ROLE}
            options={roleData}
            multiple
          />
          <AutocompleteC
            name="hardSkillIds"
            title={addResourceText.HARD_SKILLS}
            placeholder={resourcePlaceholder.HARD_SKILLS}
            options={skillData}
            multiple
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
            display: "flex",
            justifyContent: "flex-end",
            gap: "32px",
            p: "0 32px 32px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "secondary.light",
              ":hover": {
                backgroundColor: "secondary.light",
                opacity: 0.8,
              },
            }}
            onClick={closeHandler}
          >
            {buttonText.CANCEL}
          </Button>
          <Button
            sx={{
              backgroundColor: type === "ADD" ? "primary.main" : "secondary.main",
              ":hover": {
                backgroundColor: type === "ADD" ? "primary.main" : "secondary.main",
                opacity: 0.8,
              },
            }}
            type="submit"
          >
            {type === "ADD" ? buttonText.ADD_NEW : buttonText.SAVE}
          </Button>
        </Box>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default ResourceModal;
