import fs from 'fs'
import PQueue from 'p-queue'
import { promisify } from 'util'
import gfs from 'graceful-fs'

const fileReadQueue = new PQueue({
  /**
   * with concurrency 128, EMFile errors still occur
   * with concurrency 16, they do not occur anymore
   */
  concurrency: 16,
})

const origReadFile = fs.promises.readFile
const newReadFile: typeof fs.promises.readFile = ((...args) => {
  return fileReadQueue.add(() => origReadFile.apply(fs.promises, args))
}) as typeof fs.promises.readFile
fs.promises.readFile = newReadFile

export default { // eslint-disable-line
  copyFile: promisify(gfs.copyFile),
  createReadStream: gfs.createReadStream,
  link: promisify(gfs.link),
  readFile: promisify(gfs.readFile),
  stat: promisify(gfs.stat),
  writeFile: promisify(gfs.writeFile),
}
