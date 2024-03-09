import { useState, ChangeEvent, FormEvent } from 'react'
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
      <form onSubmit={handleSubmit(insertData)}>
        <input 
          type="text"
          name='applicationName'
          value={insertData.applicationName} 
          onChange={handleChange}/>
        <button type='submit'>insert Application</button>
      </form>
    </>
  )
}
