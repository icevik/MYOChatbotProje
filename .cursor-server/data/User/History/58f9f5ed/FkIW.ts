import { Auth0Provider } from '@auth0/auth0-react';

export const auth0Config = {
  domain: 'dev-8h3oit57of6ajoru.us.auth0.com',
  clientId: 'i8DPk6WZSJx64AlLCKR7wK8FcXO8qS5F',
  redirectUri: window.location.origin,
  audience: 'https://api.yeditepemyo.digital',
  scope: 'openid profile email'
};

export const Auth0ProviderWithConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider {...auth0Config}>
      {children}
    </Auth0Provider>
  );
}; 