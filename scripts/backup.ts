import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

import { getPaths } from '@redwoodjs/project-config'
export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)

  // backup db
  const dbPath = path.join(getPaths().api.db, 'dev.db')
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:Z]/g, '')
    .substring(0, 15)
  console.log(timestamp)
  const backupPath = path.join(
    getPaths().base,
    `exports/backups/db_backup.db.${timestamp}.backup`
  )

  // zip backupPath
  const zipPath = path.join(
    getPaths().base,
    `exports/backups/db_backup.db.${timestamp}.zip`
  )
  fs.copyFileSync(dbPath, backupPath)
  fs.createReadStream(backupPath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(zipPath))
  console.log(`:: Backup created at ${zipPath} ::`)
}
