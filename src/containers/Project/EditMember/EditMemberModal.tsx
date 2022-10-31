import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { assignResourcePlaceholder, assignResourceText, buttonText } from "core/constant";
import { DatePickerC, FormWrapper, TextFieldC } from "core/form";
import { AddProjectForm } from "core/interface/project";
import ModalWrapper from "../../../components/ModalWrapper";

interface Props {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
}
const EditMemberModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [start, setStart] = useState<Moment>();
  const [end, setEnd] = useState<Moment>();
  const methods = useForm<AddProjectForm>();
  // TODO edit member in project, do it in next sprint
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const startDate = moment(data.startDate.toString()).format("M-D-YYYY");
    const endDate = moment(data.endDate.toString()).format("M-D-YYYY");
    // eslint-disable-next-line no-console
    console.log({ ...data, startDate, endDate });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
  }, [isOpen, methods]);

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={() => setIsOpen(false)} title={"Edit member"}>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <Stack spacing={3} sx={{ py: "32px", px: "64px" }}>
          <TextFieldC
            name="name"
            title={assignResourceText.NAME}
            placeholder={assignResourceText.NAME}
            type="text"
            InputProps={{ sx: { width: "100%", minWidth: "50%" } }}
          />

          <DatePickerC
            name="startDate"
            maxDate={start}
            title={assignResourceText.START_DATE}
            toolbarPlaceholder={assignResourcePlaceholder.DATE}
            onChange={(date) => {
              if (!date || !date.isValid()) {
                setEnd(undefined);
              } else {
                setEnd(date.add(1, "days"));
              }
            }}
          />

          <DatePickerC
            name="endDate"
            minDate={end}
            title={assignResourceText.END_DATE}
            toolbarPlaceholder={assignResourcePlaceholder.DATE}
            onChange={(date) => {
              if (!date || !date.isValid()) {
                setStart(undefined);
              } else {
                setStart(date.subtract(1, "days"));
              }
            }}
          />

          <TextFieldC
            name="bandwidth"
            title={assignResourceText.BANDWIDTH}
            placeholder={assignResourcePlaceholder.BANDWIDTH}
            type="text"
            InputProps={{ sx: { width: "100%", minWidth: "50%" } }}
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
            onClick={() => setIsOpen(false)}
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
            {buttonText.SAVE}
          </Button>
        </Box>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default EditMemberModal;
