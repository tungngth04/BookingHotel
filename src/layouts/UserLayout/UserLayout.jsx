import { Outlet } from 'react-router-dom'
import HeaderUser from '../../common/HeaderUser/HeaderUser'
import './UserLayout.scss'
const UserLayout = () => {
  return (
    <div className='layout-content'>
      <HeaderUser />
      <div className='layout-outlet'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
