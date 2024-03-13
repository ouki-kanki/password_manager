import { Link } from 'react-router-dom'
import { useFoo } from '@renderer/components/Layouts/SettingsLayout/SettingsLayout'
import { useSearchParams } from 'react-router-dom'
import { Button } from 'antd'
import './advanced.scss'
import { searchParamCreator } from '../../../utils/searchParamCreator'

export const Advanced = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { foo } = useFoo()
  // console.log("foo inside", foo)
  console.log("the search params", searchParams.toString())



  return (
    <div className='advanced-container'>
      <h2>Advanced</h2>
      <Button onClick={() => setSearchParams({name: 'ouki'})}>add ouki to the game</Button>
      <Button onClick={() => setSearchParams({})}>clear</Button>

      <div className='advanced-link-container'>
        <Link to='?name=ouki'>set ouki</Link>
        <Link to='?type=general'>set ouki type</Link>
        <Link to={searchParamCreator("type", "general", searchParams)}>set ouki type general</Link>
        <Link to={searchParamCreator("type", "great general", searchParams)}>set ouki type great general</Link>
        <Link to={searchParamCreator("state", "quin", searchParams)}>set ouki state</Link>
      </div>
    </div>
  )
}
