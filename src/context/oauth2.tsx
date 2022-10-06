import { CustomFC } from 'core/interface/component';
import { createContext, useContext } from 'react';

//TODO: future implementation

interface IOauth2Config {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  state?: string;
  authorizeUrl: string;
  tokenUrl: string;
  verifyUrl: string;
  refreshTokenUrl: string;
}

export class OAuth2 {
  private clientId: string;
  private redirectUri: string;
  private scopes: string[];
  private state: string | undefined;
  private authorizeUrl: string;
  private tokenUrl: string;
  private verifyUrl: string;
  private refreshTokenUrl: string;

  constructor({
    clientId,
    redirectUri,
    scopes,
    state,
    authorizeUrl,
    refreshTokenUrl,
    tokenUrl,
    verifyUrl,
  }: IOauth2Config) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scopes = scopes;
    this.state = state;
    this.authorizeUrl = authorizeUrl;
    this.tokenUrl = tokenUrl;
    this.refreshTokenUrl = refreshTokenUrl;
    this.verifyUrl = verifyUrl;
  }

  loginRedirect() {
    const url = new URL(this.authorizeUrl);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('response_type', 'token');
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('scope', this.scopes.join(' '));
    if (this.state) {
      url.searchParams.append('state', this.state);
    }
    window.location.href = url.href;
  }

  loginPopup() {
    const url = new URL(this.authorizeUrl);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('response_type', 'token');
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('scope', this.scopes.join(' '));
    if (this.state) {
      url.searchParams.append('state', this.state);
    }
    const popup = window.open(url.href, 'oauth2', 'width=600,height=600');
    if (popup) {
      popup.focus();
    }
  }

  async getTokenSilently() {
    const url = new URL(this.tokenUrl);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('grant_type', 'client_credentials');
    const response = await fetch(url.href, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  }

  async getToken(code: string) {
    const url = new URL(this.tokenUrl);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('code', code);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('grant_type', 'authorization_code');
    const response = await fetch(url.href, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  }

  async refreshToken(refreshToken: string) {
    const url = new URL(this.refreshTokenUrl);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('refresh_token', refreshToken);
    url.searchParams.append('grant_type', 'refresh_token');
    const response = await fetch(url.href, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  }

  async verifyToken(accessToken: string) {
    const url = new URL(this.verifyUrl);
    url.searchParams.append('token', accessToken);
    const response = await fetch(url.href, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
}

interface Oauth2ProviderProps {
  config: OAuth2;
}

const Oauth2Context = createContext<OAuth2>(
  new OAuth2({
    authorizeUrl: '',
    clientId: '',
    redirectUri: '',
    refreshTokenUrl: '',
    scopes: [],
    tokenUrl: '',
    verifyUrl: '',
    state: '',
  })
);

export const Oauth2Provider: CustomFC<Oauth2ProviderProps> = ({
  children,
  config,
}) => {
  return (
    <Oauth2Context.Provider value={config}>{children}</Oauth2Context.Provider>
  );
};

const useOauth2 = () => {
  const instance = useContext(Oauth2Context);

  return { instance };
};
