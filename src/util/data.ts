import { ObjectLiteral } from 'core/interface/api';
import { SelectOption } from 'core/interface/select';

export const dataToOptions = <T extends ObjectLiteral>(
  list: T[] | undefined,
  label: keyof T,
  value: keyof T
): SelectOption[] => {
  if (!list) return [];
  return list.map((item) => ({ label: item[label], value: item[value] }));
};
