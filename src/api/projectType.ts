import { http } from "core/api";
import { ApiResponse } from "core/interface/api";
import { ProjectType } from "core/interface/models/projectType";

export const getProjectType = (): ApiResponse<ProjectType[]> => {
  const url = "rms/api/project-types";
  return http.get(url);
};
