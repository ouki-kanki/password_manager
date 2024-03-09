import { db } from "../db/dbMgr";
import { Statement } from 'better-sqlite3'
import type { IInsertData } from '../../types'

export const getApplications = async (): Promise<void> => {
  try {
    if (db) {
      console.log("yyoyo", db)
      const query = 'SELECT * FROM application'
      const readQuery = db.prepare(query)
      console.log(readQuery.all())
    } 
  } catch (error) {
    console.log(error)
  }
}


export const insertApplication = async ({
  applicationName,
  email,
  username,
  password
}: IInsertData): Promise<void> => {
  if (db) {
    const transaction = db.transaction(() => {
      try {
        if (db) {
          // TODO: why i need to guard again ? because of the closure?
          const insertToApp: Statement = db.prepare('INSERT INTO application (name) VALUES (?)')
          const app = insertToApp.run(applicationName);
          const appId = app.lastInsertRowid;
    
          console.log("the app id", appId)
        }
      } catch (error) {
        console.log("the error", error)
      }
    })
    transaction()
  }
} 