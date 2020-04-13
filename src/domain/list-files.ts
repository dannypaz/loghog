import fs from 'fs'
import util from 'util'
import { LOG_EXTS } from '../config'

export default async function (path: string): Promise<string[]> {
  const fsReaddir = util.promisify(fs.readdir)
  const paths = await fsReaddir(path)

  return paths.filter((p) => {
    return LOG_EXTS.some(ext => p.endsWith(ext))
  })
}
