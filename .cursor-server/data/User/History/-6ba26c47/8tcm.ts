import { auth } from 'express-oauth2-jwt-bearer';

export const auth0Middleware = auth({
    audience: 'https://dev-8h3oit57of6ajoru.us.auth0.com/api/v2/',
    issuerBaseURL: 'https://dev-8h3oit57of6ajoru.us.auth0.com/',
    tokenSigningAlg: 'RS256'
}); 