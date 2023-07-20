import { promisify } from 'util'
import gfs from 'graceful-fs'

import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
fs.promises.readFile = promisify(gfs.readFile) as any

export default { // eslint-disable-line
  copyFile: promisify(gfs.copyFile),
  createReadStream: gfs.createReadStream,
  link: promisify(gfs.link),
  readFile: promisify(gfs.readFile),
  stat: promisify(gfs.stat),
  writeFile: promisify(gfs.writeFile),
}
