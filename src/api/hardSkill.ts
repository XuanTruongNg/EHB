import { http } from 'core/api';
import { config } from 'core/constant/config';
import { ApiResponse } from 'core/interface/api';
import { HardSkillResponse } from 'core/interface/hardSkill';

export const getHardSkill = (): ApiResponse<HardSkillResponse[]> => {
  const url = `${config.SERVER_URL}/hard-skills`;
  return http.get(url);
};
