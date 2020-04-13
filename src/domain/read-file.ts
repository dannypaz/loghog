import fs from 'fs'
import readline from 'readline'
import { Response } from 'express'

interface ReadFileOptions {
  limit?: number,
  filter?: string
}

interface FileResponse {
  lines: string[],
  count: number
}

export default function (path: string, res: Response, options: ReadFileOptions = {}): Promise<FileResponse> {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(path)
    const rl = readline.createInterface({
      input,
      crlfDelay: Infinity
    })

    const lines: string[] = []

    rl.on('line', (line: string) => {
      if (options.filter && !line.includes(options.filter)) {
        return
      }

      if (options.limit && lines.length >= options.limit) {
        lines.shift()
        lines.push(line)
      } else {
        lines.push(line)
      }
    })

    rl.on('close', () => {
      for (const line of lines.reverse()) {
        res.write(line + '\n')
      }

      return resolve()
    })
    rl.on('error', reject)
  })
}
