import dotenv from 'dotenv';
dotenv.config();

const getDefaultValue = (value, defaultValue) => {
  if (!value || value === 'undefined') return defaultValue;
  return value;
};

const prodHosts = [];
const devHosts = ['http://localhost:8080', 'http://localhost:4200'];

const config = {
  IS_DEV: getDefaultValue(process.env.NODE_DEV, 'development') !== 'production',
  DATABASE_URI: getDefaultValue(
    process.env.DATABASE_URI,
    'mongodb://localhost:27017/overlaid-db',
  ),
  API_PORT: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 8080,
  SOCKET_PORT: process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4200,
  EXIT_SUCCESS: 1,
  EXIT_FAILURE: 0,
  ALLOW_HOSTS_LIST:
    getDefaultValue(process.env.NODE_DEV, 'development') === 'production'
      ? prodHosts
      : devHosts,
};

export default config;
