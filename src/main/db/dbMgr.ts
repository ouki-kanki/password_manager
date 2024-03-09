import Db, { Database } from 'better-sqlite3'
import path from 'node:path'


let db: Database | undefined;

const dbPath = 
  process.env.NODE_ENV === 'development'
    ? 'database.sqlite'
    : path.join(process.resourcesPath, "database.sqlite")

try {
  db = new Db(dbPath, {
    fileMustExist: true,
    verbose: console.log
  });
  db.pragma('journal_mode = WAL')
  console.log("db connected")
} catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error on db connection", error.message)
      throw new Error(error.message)
    }
    throw new Error("Couldn't connect to the database")
}

export { db };


  