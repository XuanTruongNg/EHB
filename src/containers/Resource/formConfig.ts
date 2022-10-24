import * as yup from 'yup';

export const resourceSchema = yup.object({
  name: yup.string().required().label('Resource name'),
  departmentId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Department')
    .nullable(),
  roleId: yup
    .number()
    .transform((_, val) => (typeof val === 'number' ? val : null))
    .required()
    .label('Role')
    .nullable(),
  hardSkillIds: yup.array().min(1).label('Hard skills'),
  yearsOfExperience: yup
    .number()
    .required()
    .typeError('Years of experience must be a valid number')
    .label('Years of experience')
    .min(0),
});
