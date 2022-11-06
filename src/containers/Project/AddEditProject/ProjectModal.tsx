import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import moment, { Moment } from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ModalWrapper from "components/ModalWrapper";
import { addProjectPlaceholder, ProjectText, buttonText } from "core/constant";
import { DatePickerC, FormWrapper, SelectC, TextFieldC } from "core/form";
import { AddProjectForm, IEditProjectForm } from "core/interface/project";
import { useCreateProject, useGetProjectById, useUpdateProject } from "hooks/project";
import { useGetProjectType } from "hooks/projectType";
import { dataToOptions } from "util/";
import { addProjectModal, editProjectModal } from "./formConfig";

interface Props {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  type: "EDIT" | "ADD" | null;
}

const ProjectModal: FC<Props> = ({ isOpen, setIsOpen, type }) => {
  const [maxStartDate, setMaxStartDate] = useState<Moment | undefined>();
  const [minEndDate, setMinEndDate] = useState<Moment | undefined>(moment().add(1, "d"));
  const methods = useForm<AddProjectForm | IEditProjectForm>({
    resolver: yupResolver(type === "ADD" ? addProjectModal : editProjectModal),
  });

  const { id } = useParams<{ id: string }>();

  const { project } = useGetProjectById({ id: Number(id) });

  const { projectTypes } = useGetProjectType();
  const projectTypeData = useMemo(() => dataToOptions(projectTypes, "name", "id"), [projectTypes]);

  const addProject = useCreateProject();
  const updateProject = useUpdateProject();

  const onSubmit = (data: AddProjectForm | IEditProjectForm) => {
    const startDate = moment(data.startDate.toString()).format("M-D-YYYY");
    const endDate = moment(data.endDate.toString()).format("M-D-YYYY");

    switch (type) {
      case "ADD":
        addProject({ ...data, startDate, endDate } as AddProjectForm);
        setIsOpen(false);
        break;
      case "EDIT":
        updateProject({ ...data, id: Number(id), startDate, endDate });
        setIsOpen(false);
        break;
      default:
    }
  };

  useEffect(() => {
    if (type === "EDIT" && project && isOpen) {
      methods.setValue("name", project.name);
      methods.setValue("startDate", project.startDate);
      methods.setValue("endDate", project.endDate);
      methods.setValue("projectTypesId", project.projectTypes.id);
    } else methods.reset();
  }, [project, isOpen, methods, type]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title={type === "ADD" ? ProjectText.ADD : ProjectText.EDIT}
    >
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: "32px", px: "64px" }}>
          <TextFieldC
            name="name"
            title={ProjectText.NAME}
            placeholder={addProjectPlaceholder.NAME}
            type="text"
            InputProps={{ sx: { width: "100%", minWidth: "50%" } }}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ width: "200px" }}>{ProjectText.DURATION}</Typography>
            <DatePickerC
              name="startDate"
              maxDate={maxStartDate}
              minDate={moment()}
              defaultValue={moment().format("L")}
              labelStyle={{ width: "0px" }}
              toolbarPlaceholder={addProjectPlaceholder.START_DATE}
              onChange={(date) => {
                if (!date || !date.isValid()) {
                  setMinEndDate(undefined);
                } else {
                  setMinEndDate(date.add(1, "days"));
                }
              }}
            />
            <DatePickerC
              name="endDate"
              minDate={minEndDate}
              labelStyle={{ width: "60px", margin: "0 0 0 40px" }}
              title={ProjectText.END_DATE}
              toolbarPlaceholder={addProjectPlaceholder.END_DATE}
              onChange={(date) => {
                if (!date || !date.isValid()) {
                  setMaxStartDate(undefined);
                } else {
                  setMaxStartDate(date.subtract(1, "days"));
                }
              }}
            />
          </Box>

          <SelectC
            name="projectTypesId"
            title={ProjectText.TYPE}
            placeholder={addProjectPlaceholder.TYPE}
            options={projectTypeData || []}
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "32px",
            p: "32px",
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
            onClick={() => {
              setMaxStartDate(undefined);
              setMinEndDate(moment().add(1, "d"));
              setIsOpen(false);
            }}
          >
            {buttonText.CANCEL}
          </Button>
          <Button
            sx={{
              backgroundColor: "primary.main",
              ":hover": {
                backgroundColor: "primary.main",
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

export default ProjectModal;
