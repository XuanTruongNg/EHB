import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import moment, { Moment } from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "components/ModalWrapper";
import { addProjectPlaceholder, addProjectText, buttonText } from "core/constant";
import { DatePickerC, FormWrapper, SelectC, TextFieldC } from "core/form";
import { AddProjectForm } from "core/interface/project";
import { useCreateProject } from "hooks/project";
import { useGetProjectType } from "hooks/projectType";
import { dataToOptions } from "util/";
import { addProjectSchema } from "./formConfig";

interface Props {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
}

const AddProjectModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [maxStartDate, setMaxStartDate] = useState<Moment | undefined>();
  const [minEndDate, setMinEndDate] = useState<Moment | undefined>(moment().add(1, "d"));
  const methods = useForm<AddProjectForm>({
    resolver: yupResolver(addProjectSchema),
  });

  const { projectTypes } = useGetProjectType();

  const projectTypeData = useMemo(() => dataToOptions(projectTypes, "name", "id"), [projectTypes]);

  const addProject = useCreateProject();

  const onSubmit = (data: AddProjectForm) => {
    const startDate = moment(data.startDate.toString()).format("M-D-YYYY");
    const endDate = moment(data.endDate.toString()).format("M-D-YYYY");
    addProject({ ...data, startDate, endDate });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
  }, [isOpen, methods]);

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={() => setIsOpen(false)} title={addProjectText.TITLE}>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: "32px", px: "64px" }}>
          <TextFieldC
            name="name"
            title={addProjectText.NAME}
            placeholder={addProjectPlaceholder.NAME}
            type="text"
            InputProps={{ sx: { width: "100%", minWidth: "50%" } }}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ width: "200px" }}>{addProjectText.DURATION}</Typography>
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
              title={addProjectText.END_DATE}
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
            title={addProjectText.TYPE}
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
            {buttonText.ADD_NEW}
          </Button>
        </Box>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default AddProjectModal;
