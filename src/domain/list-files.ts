import fs from 'fs'
import util from 'util'

const LOG_EXTENSIONS = Object.freeze([
  '.log'
])

export default async function (path: string): Promise<string[]> {
  const fsReaddir = util.promisify(fs.readdir)
  const paths = await fsReaddir(path)

  return paths.filter((p) => {
    return LOG_EXTENSIONS.some(ext => p.endsWith(ext))
  })
}
