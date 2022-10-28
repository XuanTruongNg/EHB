import { ObjectLiteral } from "core/interface/api";
import { AddResourceForm } from "core/interface/resource";
import { SelectOption } from "core/interface/select";

export const dataToOptions = <T extends ObjectLiteral>(
  list: T[] | undefined,
  label: keyof T,
  value: keyof T
): SelectOption[] => {
  if (!list) return [];
  return list.map((item) => ({ label: item[label], value: item[value] }));
};

export const isAddResource = (data: ObjectLiteral): data is AddResourceForm => data && data["uuid"];
