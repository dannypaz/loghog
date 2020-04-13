import * as fs from 'fs'
import util from 'util'

export default async function (path: string): Promise<boolean> {
  const fsAccess = util.promisify(fs.access)

  try {
    // Checks if file exists and is readable
    await fsAccess(path, fs.constants.F_OK | fs.constants.R_OK)
    return true
  } catch (e) {
    return false
  }
}
