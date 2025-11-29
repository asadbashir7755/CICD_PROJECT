import { ACCESS_COOKIE_MAXAGE, NODE_ENV } from '../config/utils.js';
const defaultMaxAge = 3600000;
interface CookieObject {
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  maxAge: number;
  path: string;
}
const maxAge =
  typeof ACCESS_COOKIE_MAXAGE === 'string' ? parseInt(ACCESS_COOKIE_MAXAGE, 10) : defaultMaxAge;

const validMaxAge = isNaN(maxAge) ? defaultMaxAge : maxAge;

// For HTTP deployments (even in production), we need secure:false and sameSite:lax
// Only use secure:true and sameSite:none when actually using HTTPS
export const cookieOptions: CookieObject = {
  httpOnly: true,
  sameSite: 'lax',  // Works with HTTP
  secure: false,     // Set to false for HTTP deployments
  maxAge: validMaxAge,
  path: '/',
};
