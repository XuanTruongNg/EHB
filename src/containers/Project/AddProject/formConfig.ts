import * as yup from "yup";

export const addProjectSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Please enter a valid name")
    .min(3)
    .max(100)
    .label("Project name"),
  startDate: yup.date().typeError("Please select a date"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date can't be before start date")
    .typeError("Please select a date"),
  projectTypesId: yup
    .number()
    .transform((_, val) => {
      if (typeof val === "number") return val;
      return null;
    })
    .required("Please select a project type")
    .label("Project Type")
    .nullable(),
});
