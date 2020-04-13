const {
  API_HOST: HOST,
  API_PORT: PORT,
  LOG_EXTS: EXTS,
  DEBUG: LOG_LEVEL
} = process.env

const LOG_TYPE_DELIMETER = ','

function formatLogExtensions (value: string): string[] {
  const types = value.split(LOG_TYPE_DELIMETER)
  for (const type of types) {
    if (!type.startsWith('.')) {
      throw new Error(`Invalid logtype format "${type}": Use '.<mytype' and comma delimit`)
    }
  }
  return types
}

const extensions = EXTS
  ? formatLogExtensions(EXTS)
  : ['.log']

export const API_HOST = HOST || '0.0.0.0'
export const API_PORT = parseInt(PORT || '3000', 10)
export const DEBUG = LOG_LEVEL || 'info'
export const LOG_PATH = '/var/log'
export const LOG_EXTS = extensions
