import { config } from "core/constant/config";

export const getLoginCasdoorUrl = () => {
  const urlParts = [
    `${config.GATEWAY_URL}/login?client_id=${config.CASDOOR_CLIENT_ID}`,
    `&redirect_uri=${config.CASDOOR_REDIRECT_URI}&response_type=${config.CASDOOR_RESPONSE_TYPE}`,
    `&scope=${config.CASDOOR_SCOPE}&state=${config.CASDOOR_STATE}`,
  ];
  return urlParts.join("");
};
