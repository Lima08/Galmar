import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export const ROOT = join(__dirname, '..')

const SCANNED_DIRS = ['app', 'components']
const VENDOR_DIR = join('components', 'ui')

const listFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return listFiles(path)
    return /\.(tsx?|css)$/.test(entry) && !/\.test\.tsx?$/.test(entry)
      ? [path]
      : []
  })

// Fontes do projeto em app/ e components/, exceto o vendor shadcn
export const sourceFiles = SCANNED_DIRS.flatMap((dir) =>
  listFiles(join(ROOT, dir))
)
  .map((file) => relative(ROOT, file))
  .filter((file) => !file.startsWith(VENDOR_DIR))

export const readSource = (path: string) =>
  readFileSync(join(ROOT, path), 'utf8')
