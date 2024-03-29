import { db } from "../db/dbMgr";
import { Statement } from 'better-sqlite3'
import type { IInsertData } from '../../types'
import { encrypt, decrypt } from "../utils/encrypt";
import type { GetApplicationsQueryParams, ApplicationData } from "../../types";

// GET ONLY APPLICATIONS
export const getApplications = async (): Promise<void> => {
  try {
    if (db) {
      const query = 'SELECT * FROM application'
      const readQuery = db.prepare(query)
      console.log(readQuery.all())
    } 
  } catch (error) {
    console.log(error)
  }
}


// GET APPLICATION & RELATED
// TODO: use the query to filter by a querystring
// if there is query string modify the query to search based on that query
export function getApplicationsAndRelatedData(): ApplicationData;
export function getApplicationsAndRelatedData(params: GetApplicationsQueryParams): ApplicationData;
export function getApplicationsAndRelatedData ({ name, username, email }: GetApplicationsQueryParams = {}): ApplicationData  {
  try {
    if (!db) {
      throw new Error("db is down")
    }
    
    let query = ' SELECT a.id, a.name, u.value as username, e.value as email, p.value as password \
                    FROM application a \
                    INNER JOIN credentials c \
                    ON c.application_id = a.id \
                    LEFT JOIN password p \
                    ON p.credentials_id = c.id \
                    LEFT JOIN username u \
                    ON u.credentials_id = c.id \
                    LEFT JOIN email e \
                    ON e.credentials_id = c.id'


    const params: string[] = []
    if (name || username || email) {
      query += ' WHERE '
      const conditions: string[] = []

      if (name) {
        conditions.push('a.name LIKE ?')
        params.push(`%${name}%`)
      }

      if (username) {
        conditions.push('u.value LIKE ?')
        params.push(`%${username}%`)
      }

      if (email) {
        conditions.push('e.value LIKE ?')
        params.push(`%${email}%`)
      }

      query += conditions.join(' AND ')
    }

    console.log("the final query", query)

    const readQuery = db.prepare(query)
    const data = readQuery.all(params) as ApplicationData[];
    
    const decryptedData = data.map(d => {
      if (d.password) {
        d.password = decrypt(d.password)
      }
      return d
    })
    // console.log("the decrypted data", decryptedData)

    return decryptedData
  } catch (error) {
    console.log(error)
  }
}

// INSERT
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

          if (password) {
            console.log("inside the if of pass", password)
            const encryptedPass = encrypt(password);
            
            const insertToPass = db.prepare(
              'INSERT INTO password (credentials_id, value) VALUES (?, ?)'
            )
            insertToPass.run(credId, encryptedPass)
          }
        }
      } catch (error) {
        console.log("error in inserting data", error)
      }
    })
    transaction()
  }
}

export const testCrypto = (value: string): void => {
  encrypt(value);
}