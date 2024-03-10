import { useState, ChangeEvent, FormEvent } from 'react'
import styles from './insertForm.module.css'
import type { IInsertData } from '../../../../types'


interface IInsertFormProps {
  handleInsertApplicationData: (data: IInsertData) => void;
}

export const InsertForm = ({ handleInsertApplicationData }: IInsertFormProps): JSX.Element => {
  const [insertData, setInsertData] = useState<IInsertData>({
    applicationName: '',
    username: '',
    email: '',
    password: ''
  })


  const handleChange = ({ target: { name, value }}: ChangeEvent<HTMLInputElement>): void => {
    setInsertData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleSubmit = (data: IInsertData) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: validate the data
    if (!data.applicationName) {
      return
    }

    handleInsertApplicationData(data)

    setInsertData({
      applicationName: '',
      username: '',
      email: '',
      password: ''
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(insertData)} className={styles.formContainer}>
        <fieldset>
          <label htmlFor="app_name">Application name</label>
          <input
            autoFocus
            type="text"
            name='applicationName'
            id='app_name'
            value={insertData.applicationName} 
            onChange={handleChange}/>
        </fieldset>

        <fieldset>
          <label htmlFor="user">Username</label>
          <input 
            type="text"
            name='username'
            id='user'
            value={insertData.username} 
            onChange={handleChange}/>
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            name='email'
            id='email'
            value={insertData.email} 
            onChange={handleChange}/>
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name='password'
            id='password'
            value={insertData.password} 
            onChange={handleChange}/>
        </fieldset>

        <fieldset className={styles.action}>
          <button type='submit'>insert Application</button>
        </fieldset>
      </form>
    </>
  )
}
