import { http } from "core/api";
import { ApiResponse } from "core/interface/api";
import { HardSkillResponse } from "core/interface/hardSkill";

export const getHardSkill = (): ApiResponse<HardSkillResponse[]> => {
  const url = "/rms/api/hard-skills";
  return http.get(url);
};
