const {
  API_HOST: HOST,
  API_PORT: PORT,
  DEBUG: LOG_LEVEL
} = process.env

export const API_HOST = HOST || '0.0.0.0'
export const API_PORT = parseInt(PORT || '3000', 10)
export const DEBUG = LOG_LEVEL || 'info'
export const LOG_PATH = '/var/log'
