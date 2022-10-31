import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import moment, { Moment } from "moment";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ASSIGN, buttonText, editProjectText, HEADER_MARGIN, PAGE_HEADER_MARGIN, PROJECT } from "core/constant";
import { DatePickerC, FormWrapper, SelectC, TextFieldC } from "core/form";
import { IEditProjectForm, TempProject } from "core/interface/project";
import { SelectOption } from "core/interface/select";
import { useUpdateProject } from "hooks";
import EditProjectHeader from "./EditProjectHeader";
import { editProjectSchema } from "./formConfig";
interface Props {
  isEditDisabled: boolean;
  setIsEditDisabled: (_isDisabled: boolean) => void;
  projectTypeData: SelectOption[];
  project: TempProject | undefined;
  children: ReactNode;
}
const EditProjectForm: FC<Props> = ({ isEditDisabled, setIsEditDisabled, projectTypeData, project, children }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [start, setStart] = useState<Moment>();
  const [end, setEnd] = useState<Moment>();
  const updateProject = useUpdateProject();
  const methods = useForm<IEditProjectForm>({
    resolver: yupResolver(editProjectSchema),
  });
  const handleReset = useCallback(
    (data: TempProject | undefined) => {
      if (typeof data == "undefined") {
        return;
      }
      methods.reset({
        code: data.code,
        name: data.name,
        projectManagerId: data.projectManager.id,
        projectTypesId: data.projectTypes.id,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    },
    [methods]
  );
  const onSubmit = (data: IEditProjectForm) => {
    if (!id) return;
    const startDate = moment(data.startDate.toString()).format("MM-DD-YYYY");
    const endDate = moment(data.endDate.toString()).format("MM-DD-YYYY");
    updateProject({ ...data, id: Number(id), startDate, endDate }, { onError: () => handleReset(project) });
    setIsEditDisabled(!isEditDisabled);
  };
  useEffect(() => {
    if (project) {
      handleReset(project);
    }
  }, [project, handleReset, methods]);
  return (
    <>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <EditProjectHeader>
          <Box sx={{ display: "flex", gap: 4 }}>
            <TextFieldC
              labelStyle={{ width: 0 }}
              name="code"
              sx={{ width: "100%", maxWidth: 150 }}
              InputProps={{ style: { fontWeight: "bold", height: 30 } }}
              disabled={isEditDisabled}
            />
            <TextFieldC
              labelStyle={{ width: 0 }}
              name="name"
              sx={{ width: "100%", maxWidth: 150 }}
              InputProps={{ style: { fontWeight: "bold", height: 30 } }}
              disabled={isEditDisabled}
            />
          </Box>
        </EditProjectHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "32px",
            p: "32px",
            flex: 1,
            overflow: "auto",
            height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}px)`,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 15,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                <TextFieldC
                  name="projectManagerId"
                  title={editProjectText.PROJECT_MANAGER}
                  type="number"
                  labelStyle={{ width: "130px", fontWeight: 600 }}
                  sx={{ marginLeft: 2, width: 200 }}
                  disabled={isEditDisabled}
                />
                <SelectC
                  name="projectTypesId"
                  title={editProjectText.PROJECT_TYPE}
                  sx={{ width: 200, marginLeft: 2 }}
                  labelStyle={{ width: "130px", fontWeight: 600 }}
                  options={projectTypeData}
                  disabled={isEditDisabled}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <DatePickerC
                    labelStyle={{ width: "90px", fontWeight: 600 }}
                    inputStyle={{ marginLeft: 2, marginRight: 2 }}
                    title={editProjectText.DURATION}
                    name="startDate"
                    disabled={isEditDisabled}
                    maxDate={start}
                    onChange={(date) => {
                      if (!date || !date.isValid()) {
                        setEnd(undefined);
                      } else {
                        setEnd(date.add(1, "days"));
                      }
                    }}
                  />
                  <DatePickerC
                    labelStyle={{ width: "auto" }}
                    inputStyle={{ marginLeft: 2 }}
                    title={editProjectText.END_DATE}
                    name="endDate"
                    disabled={isEditDisabled}
                    minDate={end}
                    onChange={(date) => {
                      if (!date || !date.isValid()) {
                        setStart(undefined);
                      } else {
                        setStart(date.subtract(1, "days"));
                      }
                    }}
                  />
                </Box>
                <TextFieldC
                  title={"Total members"}
                  type="text"
                  disabled={isEditDisabled}
                  value={project?.resourcesProjects.length || 0}
                  labelStyle={{ width: "130px", fontWeight: 600 }}
                  sx={{
                    "& fieldset": { border: "none" },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "#000",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1 1 0%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingRight: "4%",
              }}
            >
              {isEditDisabled ? (
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    ":hover": {
                      backgroundColor: "secondary.main",
                      opacity: 0.8,
                    },
                    width: "200px",
                    fontSize: "16px",
                  }}
                  onClick={() => setIsEditDisabled(!isEditDisabled)}
                >
                  {buttonText.EDIT_PROJECT}
                </Button>
              ) : null}
              {!isEditDisabled ? (
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    ":hover": {
                      backgroundColor: "secondary.main",
                      opacity: 0.8,
                    },
                    width: "200px",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate(`${PROJECT}/${id}${ASSIGN}`)}
                >
                  {buttonText.ADD_NEW_MEMBER}
                </Button>
              ) : null}
            </Box>
          </Box>
          {children}
          {!isEditDisabled ? (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "end",
                paddingRight: 2,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "secondary.light",
                  ":hover": {
                    backgroundColor: "secondary.light",
                    opacity: 0.8,
                  },
                  width: "150px",
                  fontSize: "16px",
                }}
                onClick={() => {
                  setIsEditDisabled(true);
                  handleReset(project);
                }}
              >
                {buttonText.CANCEL}
              </Button>
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  ":hover": {
                    backgroundColor: "secondary.main",
                    opacity: 0.8,
                  },
                  width: "150px",
                  fontSize: "16px",
                }}
                type="submit"
              >
                {buttonText.SAVE}
              </Button>
            </Box>
          ) : null}
        </Box>
      </FormWrapper>
    </>
  );
};
export default EditProjectForm;
