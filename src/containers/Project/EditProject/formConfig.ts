import * as yup from "yup";

export const editProjectSchema = yup.object({
  name: yup.string().required().label("Project name"),
  code: yup.string().required().label("Project code"),
  projectManagerId: yup
    .number()
    .transform((_, val) => {
      if (typeof val === "number") return val;
      return null;
    })
    .required()
    .label("Project Manager")
    .nullable(),
  startDate: yup.date().max(yup.ref("endDate"), "Start date can't be after end date").typeError("Invalid date!"),
  endDate: yup.date().min(yup.ref("startDate"), "End date can't be before start date").typeError("Invalid date!"),
  projectTypesId: yup
    .number()
    .transform((_, val) => {
      if (typeof val === "number") return val;
      return null;
    })
    .required()
    .label("Project Type")
    .nullable(),
});
