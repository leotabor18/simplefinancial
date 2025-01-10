import { GrantType, setupKinde } from '@kinde-oss/kinde-node-express';
import { throwError } from './error.js';
import { validateToken } from '@kinde/jwt-validator';

const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  scope: 'openid profile email',
  grantType: GrantType.AUTHORIZATION_CODE, // or CLIENT_CREDENTIALS or PKCE
  unAuthorisedUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
};

const authSetup = (app) => {
  setupKinde(config, app);
};

const handleAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throwError(403, 'Unauthorized access to the resource. Token not found!');
    }

    const tokenString = req.headers.authorization.replace('Bearer ', '');
    const token = await validateToken({
      token: tokenString,
      domain: process.env.KINDE_ISSUER_URL,
    });

    if (!token.valid) {
      throwError(403, 'Unauthorized access to the resource. Token validation failed!');
    }
    // TODO: Add token expiration validation here
    
    next();
  } catch (error) {
    next(error);
  }
};

export { authSetup, handleAuth };
