import { auth } from 'express-oauth2-jwt-bearer';

const auth0Config = {
  domain: 'dev-8h3oit57of6ajoru.us.auth0.com',
  audience: 'https://www.knowhy.site/api/v1'
};

export const checkJwt = auth({
  audience: auth0Config.audience,
  issuerBaseURL: `https://${auth0Config.domain}`,
  tokenSigningAlg: 'RS256'
}); 