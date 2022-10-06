import { User } from '../models';

export interface TokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface UserState {
  isTriedLogin: boolean;
  user: User | null;
  token: TokenResponse | null;
}

export interface Properties {}

export interface Role {
  owner: string;
  name: string;
  createdTime: Date;
  displayName: string;
  users: string[];
  roles: any[];
  domains: any[];
  isEnabled: boolean;
}

export interface UserDecode {
  owner: string;
  name: string;
  createdTime: Date;
  updatedTime: string;
  id: string;
  type: string;
  password: string;
  passwordSalt: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  permanentAvatar: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  location: string;
  address: any[];
  affiliation: string;
  title: string;
  idCardType: string;
  idCard: string;
  homepage: string;
  bio: string;
  region: string;
  language: string;
  gender: string;
  birthday: string;
  education: string;
  score: number;
  karma: number;
  ranking: number;
  isDefaultAvatar: boolean;
  isOnline: boolean;
  isAdmin: boolean;
  isGlobalAdmin: boolean;
  isForbidden: boolean;
  isDeleted: boolean;
  signupApplication: string;
  hash: string;
  preHash: string;
  createdIp: string;
  lastSigninTime: string;
  lastSigninIp: string;
  github: string;
  google: string;
  qq: string;
  wechat: string;
  facebook: string;
  dingtalk: string;
  weibo: string;
  gitee: string;
  linkedin: string;
  wecom: string;
  lark: string;
  gitlab: string;
  adfs: string;
  baidu: string;
  alipay: string;
  casdoor: string;
  infoflow: string;
  apple: string;
  azuread: string;
  slack: string;
  steam: string;
  bilibili: string;
  okta: string;
  douyin: string;
  custom: string;
  webauthnCredentials?: any;
  ldap: string;
  properties: Properties;
  roles: Role[];
  permissions: any[];
  lastSigninWrongTime: string;
  signinWrongTimes: number;
  managedAccounts?: any;
  tag: string;
  scope: string;
  iss: string;
  sub: string;
  aud: string[];
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
}
