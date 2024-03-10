import { db } from "../db/dbMgr";
import { Statement } from 'better-sqlite3'
import type { IInsertData } from '../../types'
import { encrypt } from "../utils/encrypt";

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

          if (!appId) {
            throw new Error("could not insert application no app id ")
          }

          const insertToGredentials: Statement = db.prepare(
            'INSERT INTO credentials (application_id) VALUES (?)'
          )
          const cred = insertToGredentials.run(appId)
          const credId = cred.lastInsertRowid

          if (!credId) {
            return
          }

          // add the user
          if (username) {
            const insertToUser = db.prepare(
              'INSERT INTO username (credentials_id, value) VALUES (?, ?)')
            insertToUser.run(credId, username)
          }
          
          if (email) {
            const insertToEmail = db.prepare(
              'INSERT INTO email (credentials_id, value) VALUES (?, ?)')
            insertToEmail.run(credId, email)
          }
        }
      } catch (error) {
        console.log("the error", error)
      }
    })
    transaction()
  }
}

export const testCrypto = (value: string): void => {
  encrypt(value, process.env.ENCRYPT_KEY as string);
}