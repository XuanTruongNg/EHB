import { ObjectLiteral } from 'core/interface/api';
import { SelectOptions } from 'core/interface/select';

export const dataToOptions = <T extends ObjectLiteral>(
  list: T[] | undefined,
  label: keyof T,
  value: keyof T
): SelectOptions[] => {
  if (!list) return [];
  return list.map((item) => ({ label: item[label], value: item[value] }));
};
