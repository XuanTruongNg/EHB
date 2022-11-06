import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import moment, { Moment } from "moment";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { buttonText, editProjectText, HEADER_MARGIN, PAGE_HEADER_MARGIN, PROJECT } from "core/constant";
import { DatePickerC, FormWrapper, SelectC, TextFieldC } from "core/form";
import { IEditProject, IEditProjectForm, TempProject } from "core/interface/project";
import { SelectOption } from "core/interface/select";
import { useUpdateProject } from "hooks";
import EditProjectHeader from "./EditProjectHeader";

interface Props {
  isEditDisabled: boolean;
  setIsEditDisabled: (_isDisabled: boolean) => void;
  projectTypeData: SelectOption[];
  project: TempProject | undefined;
  children: ReactNode;
}

// eslint-disable-next-line max-lines-per-function
const EditProjectForm: FC<Props> = ({ isEditDisabled, setIsEditDisabled, projectTypeData, project, children }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [start, setStart] = useState<Moment>();
  const [end, setEnd] = useState<Moment>();
  const updateProject = useUpdateProject();
  const methods = useForm<IEditProjectForm>({});
  const handleReset = useCallback(
    (data: TempProject | undefined) => {
      if (typeof data == "undefined") {
        return;
      }
      methods.reset({
        code: data.code,
        name: data.name,
        projectManagerName: data.projectManager.name,
        projectTypesId: data.projectTypes.id,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status
      });
    },
    [methods]
  );
  const onSubmit = (data: IEditProjectForm) => {
    if (!id) return;
    const startDate = moment(data.startDate.toString()).format("MM-DD-YYYY");
    const endDate = moment(data.endDate.toString()).format("MM-DD-YYYY");
    const dataToUpdate: IEditProject = {
      name: data.name,
      projectTypesId: data.projectTypesId,
      startDate,
      endDate
    };
    updateProject({ ...dataToUpdate, id: Number(id), startDate, endDate }, { onError: () => handleReset(project) });
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => navigate(PROJECT)} />
            <TextFieldC
              labelStyle={{ width: 0 }}
              name='code'
              sx={{ width: "100%", maxWidth: 120 }}
              InputProps={{ style: { fontWeight: "bold", height: 30 } }}
              disabled={true}
            />
            <TextFieldC
              labelStyle={{ width: 0 }}
              name='name'
              sx={{ width: "100%", maxWidth: 260 }}
              InputProps={{ style: { fontWeight: "bold", height: 30 } }}
              disabled={isEditDisabled}
            />
            <Typography sx={{
              display: "flex", borderRadius: "6px", padding: " 0px 12px",
              height: 26, color: "white", backgroundColor: "#0F69EF",
              marginTop: "4px"
            }}>
              {project?.status}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", right: "5%", gap: 3 }}>
            <Button
              sx={{
                backgroundColor: "##7d7aff",
                opacity: 0.8,
                ":hover": {
                  backgroundColor: "#7d7aff",
                  opacity: 0.6
                },
                width: "80px",
                fontSize: "16px"
              }}
            >
              {buttonText.START}
            </Button>
            <Button
              sx={{
                backgroundColor: "#ff6347",
                opacity: 0.8,
                ":hover": {
                  backgroundColor: "#ff6347",
                  opacity: 0.6
                },
                width: "80px",
                fontSize: "16px"
              }}
            >
              {buttonText.DELETE}
            </Button>
          </Box>
        </EditProjectHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "32px",
            p: "8px 32px 32px 32px",
            flex: 1,
            overflow: "auto",
            height: `calc(100vh - ${HEADER_MARGIN + PAGE_HEADER_MARGIN}px)`
          }}
        >
          <Box sx={{ display: "flex", padding: "16px", border: "1px solid #C1C1C1", borderRadius: "16px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 2
                }}
              >
                <TextFieldC
                  name='projectManagerName'
                  title={editProjectText.PROJECT_OWNER}
                  type='string'
                  labelStyle={{ width: "130px", fontWeight: 600 }}
                  sx={{ marginLeft: 2, width: 200 }}
                  disabled={true}
                />
                <SelectC
                  name='projectTypesId'
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
                  gap: 3
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <DatePickerC
                    labelStyle={{ width: "90px", fontWeight: 600 }}
                    inputStyle={{ marginLeft: 2, marginRight: 2 }}
                    title={editProjectText.DURATION}
                    name='startDate'
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
                    name='endDate'
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
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1 1 0%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingRight: "1%"
              }}
            >
              {isEditDisabled ? (
                <Button
                  sx={{
                    backgroundColor: "secondary.main",
                    ":hover": {
                      backgroundColor: "secondary.main",
                      opacity: 0.8
                    },
                    width: "80px",
                    fontSize: "16px"
                  }}
                  onClick={() => setIsEditDisabled(!isEditDisabled)}
                >
                  {buttonText.EDIT}
                </Button>
              ) : (
                <Box sx={{ width: "80px", fontSize: "16px" }}></Box>
              )}
              {!isEditDisabled ? (
                <Box sx={{ display: "flex", gap: 2, alignSelf: "flex-end" }}>
                  <Button
                    sx={{
                      backgroundColor: "secondary.light",
                      ":hover": {
                        backgroundColor: "secondary.light",
                        opacity: 0.8
                      },
                      width: "80px",
                      fontSize: "16px"
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
                        opacity: 0.8
                      },
                      width: "80px",
                      fontSize: "16px"
                    }}
                    type='submit'
                  >
                    {buttonText.SAVE}
                  </Button>
                </Box>
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
                paddingRight: 2
              }}
            ></Box>
          ) : null}
        </Box>
      </FormWrapper>
    </>
  );
};
export default EditProjectForm;
