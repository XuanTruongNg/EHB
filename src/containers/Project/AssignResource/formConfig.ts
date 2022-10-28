import * as yup from "yup";

export const filterResourcesSchema = yup.object({
  roleId: yup
    .number()
    .transform((_, val) => {
      if (typeof val === "number") return val;
      return null;
    })
    .required()
    .label("Role ID")
    .nullable(),
  hardSkillIds: yup.array().label("Hard skills"),
  yoeRange: yup.array().label("Years Of Experience Range"),
});
