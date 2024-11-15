import { Outlet } from 'react-router-dom'
import HeaderUser from '../../common/HeaderUser/HeaderUser'
import './UserLayout.scss'
const UserLayout = () => {
  return (
    <div className='layout-content'>
      <HeaderUser />
      <Outlet />
    </div>
  )
}

export default UserLayout
