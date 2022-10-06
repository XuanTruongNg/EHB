export const config = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/api',

  // GATEWAY
  GATEWAY_URL: process.env.REACT_APP_GATEWAY_URL || 'http://localhost:4000',

  // CASDOOR CONFIG
  CASDOOR_CLIENT_ID: process.env.REACT_APP_CASDOOR_CLIENT_ID || '',
  CASDOOR_REDIRECT_URI: process.env.REACT_APP_CASDOOR_REDIRECT_URI || '',
  CASDOOR_RESPONSE_TYPE: process.env.REACT_APP_CASDOOR_RESPONSE_TYPE || '',
  CASDOOR_SCOPE: process.env.REACT_APP_CASDOOR_SCOPE || '',
  CASDOOR_STATE: process.env.REACT_APP_CASDOOR_STATE || '',
};
