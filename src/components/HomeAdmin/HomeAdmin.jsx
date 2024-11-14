import './HomeAdmin.scss'
import { useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
const RoomAdmin = () => {
  const navigate = useNavigate()
  const manager = [
    {
      title: 'Quản lý phòng',
      icon: <HomeOutlined />,
      path: '/admin/rooms',
    },
    {
      title: 'Quản lý khách hàng',
      icon: <UserOutlined />,
      path: '/admin/users',
    },
    {
      title: 'Quản lý sale',
      icon: <ShoppingCartOutlined />,
      path: '/admin/sales',
    },
    {
      title: 'Quản lý đặt phòng',
      icon: <BookOutlined />,
      path: '/admin/bookings',
    },
    {
      title: 'Quản lý dịch vụ',
      icon: <SolutionOutlined />,
      path: '/admin/services',
    },
    {
      title: 'Quản lý sản phẩm',
      icon: <ShoppingOutlined />,
      path: '/admin/products',
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
