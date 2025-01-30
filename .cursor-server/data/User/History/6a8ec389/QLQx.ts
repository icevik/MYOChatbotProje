import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: 'https://www.knowhy.site/api/v1',
  issuerBaseURL: 'dev-8h3oit57of6ajoru.us.auth0.com',
  tokenSigningAlg: 'RS256'
});

export { checkJwt }; 