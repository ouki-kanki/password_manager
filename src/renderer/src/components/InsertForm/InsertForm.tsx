import { useState, ChangeEvent, FormEvent } from 'react'
import './insertForm.scss'
import type { IInsertData } from '../../../../types'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { Button, Tooltip } from 'antd'
import { KeyOutlined, ScissorOutlined } from '@ant-design/icons'

import { copyToClip } from '@renderer/utils/copyToClip'

interface IInsertFormProps {
  handleInsertApplicationData: (data: IInsertData) => void;
}

export const InsertForm = ({ handleInsertApplicationData }: IInsertFormProps): JSX.Element => {
  const navigate = useNavigate()
  const [insertData, setInsertData] = useState<IInsertData>({
    applicationName: '',
    username: '',
    email: '',
    password: ''
  })

  const generateRandomPass = (): void => {
    const randomPass = window.api.generateRandomPassword()

    setInsertData(prevData => {
      return {
        ...prevData,
        password: randomPass
      }
    })
  }

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

    // TODO: catch the error if cannot add and give feedback . cancel the navigation
    handleInsertApplicationData(data)

    setInsertData({
      applicationName: '',
      username: '',
      email: '',
      password: ''
    })
    navigate(-1)
  }

  return (
    <>
      <form onSubmit={handleSubmit(insertData)} className='insert-form__container'>
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
            type="email"
            name='email'
            id='email'
            value={insertData.email}
            onChange={handleChange}/>
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <div>
            <Input.Password
              className='insert-form__pass_input'
              type="password"
              name='password'
              id='password'
              value={insertData.password}
              onChange={handleChange}/>

              <Tooltip title='copy to clip'>
                <Button
                  onClick={() => copyToClip(insertData.password)}>
                  <ScissorOutlined/>
                </Button>
              </Tooltip>

              <Tooltip title='generate a random password'>
                <Button
                  onClick={generateRandomPass}>
                  <KeyOutlined/>
                </Button>
              </Tooltip>
          </div>
        </fieldset>

        <fieldset className='insert-form__action'>
          <button type='submit'>insert Application</button>
        </fieldset>
      </form>
    </>
  )
}
