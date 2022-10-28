import * as yup from "yup";
import { PHONE_REGEX } from "core/constant";

const resourceSchema = yup.object({
  displayName: yup.string().required().label("Display name"),

  phoneNumber: yup.string().matches(new RegExp(PHONE_REGEX), "Phone number is not valid!").label("Phone number"),

  email: yup.string().email().required().label("Email"),

  name: yup.string().label("Resource name"),

  departmentId: yup
    .number()
    .transform((_, val) => {
      if (typeof val === "number") return val;
      return null;
    })
    .label("Department")
    .nullable(),

  roleIds: yup.array().label("Resource roles"),

  hardSkillIds: yup.array().label("Hard skills"),

  yearsOfExperience: yup
    .number()
    .typeError("Years of experience must be a valid number")
    .label("Years of experience")
    .min(0),
});

export const addResourceModal = resourceSchema.shape({
  uuid: yup.string().required().label("UUID"),
});

export const editResourceModal = resourceSchema;
