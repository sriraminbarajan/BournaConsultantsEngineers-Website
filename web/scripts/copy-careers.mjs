import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const dist = resolve(root, '../dist')
const dir = resolve(dist, 'careers')

mkdirSync(dir, { recursive: true })
copyFileSync(resolve(dist, 'index.html'), resolve(dir, 'index.html'))
