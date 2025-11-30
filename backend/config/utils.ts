import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

type TokenExpiry = '15m' | '30m' | '1h' | '2h' | '1d' | '7d' | '30d';

const NODE_ENV = process.env.NODE_ENV || 'development';

// In test environment, we don't need real DB/Redis connection strings as we use mocks/in-memory
const isTest = NODE_ENV === 'test';

function getEnv(key: string, required: boolean = false): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`${key} is not defined`);
  }
  // Provide defaults for tests if env vars are missing
  if (isTest && !value) {
    switch (key) {
      case 'GOOGLE_CLIENT_ID':
        return 'test-google-client-id';
      case 'GOOGLE_CLIENT_SECRET':
        return 'test-google-client-secret';
      case 'JWT_SECRET':
        return 'test-jwt-secret';
      case 'FRONTEND_URL':
        return 'http://localhost:3000';
      case 'BACKEND_URL':
        return 'http://localhost:8082';
      case 'MONGODB_URI':
        return 'mongodb://localhost:27017/test_db_placeholder';
      case 'REDIS_URL':
        return 'redis://localhost:6379';
    }
  }
  return value || '';
}

const PORT = process.env.PORT || '8082';

const MONGODB_URI = getEnv('MONGODB_URI', !isTest);
const REDIS_URL = getEnv('REDIS_URL', !isTest);

const ACCESS_COOKIE_MAXAGE = process.env.ACCESS_COOKIE_MAXAGE || '120000';
const REFRESH_COOKIE_MAXAGE = process.env.REFRESH_COOKIE_MAXAGE || '120000';

const ACCESS_TOKEN_EXPIRES_IN: TokenExpiry = (process.env.ACCESS_TOKEN_EXPIRES_IN as TokenExpiry) || '15m';
const REFRESH_TOKEN_EXPIRES_IN: TokenExpiry = (process.env.REFRESH_TOKEN_EXPIRES_IN as TokenExpiry) || '7d';

const JWT_SECRET: string = getEnv('JWT_SECRET', !isTest);

const FRONTEND_URL = getEnv('FRONTEND_URL', NODE_ENV === 'production');
const BACKEND_URL = getEnv('BACKEND_URL', NODE_ENV === 'production');

const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID', false);
const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET', false);

export {
  MONGODB_URI,
  PORT,
  REDIS_URL,
  ACCESS_COOKIE_MAXAGE,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_COOKIE_MAXAGE,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  FRONTEND_URL,
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_URL,
};
