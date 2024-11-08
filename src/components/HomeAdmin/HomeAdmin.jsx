import './HomeAdmin.scss'
import { MdCheckroom, MdOutlineAnalytics, MdOutlineBedroomParent } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const RoomAdmin = () => {
  const navigate = useNavigate()
  const manager = [
    {
      title: 'Quản lý phòng',
      icon: <MdOutlineBedroomParent />,
      path: '/admin/rooms',
    },
    {
      title: 'Quản lý khách hàng',
      icon: <FaUser />,
      path: '/admin/customers',
    },
    {
      title: 'Quản lý thống kê',
      icon: <MdOutlineAnalytics />,
      path: '/admin/statistics',
    },
    {
      title: 'Quản lý đặt phòng',
      icon: <MdCheckroom />,
      path: '/admin/bookings',
    },
    {
      title: 'Quản lý đặt phòng',
      icon: <MdCheckroom />,
      path: '/admin/bookings',
    },
  ]
  const handleClick = (value) => {
    navigate(value)
  }
  return (
    <div className='card' style={{ flex: 3 }}>
      {manager.map((item, index) => (
        <div className='card-content' key={index} onClick={() => handleClick(item.path)}>
          <div className='icon'>{item.icon}</div>
          <div className='item-title'>
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomAdmin
