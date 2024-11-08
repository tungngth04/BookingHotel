import { Flex, Menu } from 'antd'
import logo from '../../assets/images/logo-hotel.png'
import './SideBarAdmin.scss'
import {
  CarryOutFilled,
  LogoutOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SideBarAdmin = () => {
  const [activeKey, setActiveKey] = useState('1')
  const navigate = useNavigate()
  const handleMenuClick = (e) => {
    setActiveKey(e.key)
    const clickedItem = findMenuItemByKey(menuItems, e.key)
    if (clickedItem && clickedItem.path) {
      navigate(clickedItem.path)
    }
  }

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Quản lý',
      children: [
        { key: '1-1', label: 'Quản lý Phòng', path: '/admin/rooms' },
        { key: '1-2', label: 'Quản lý khách hàng', path: '/admin/customers' },
        { key: '1-3', label: 'Quản lý thống kê', path: '/admin/statistics' },
        { key: '1-4', label: 'Quản lý đặt phòng', path: '/admin/bookings' },
      ],
    },
    { key: '2', icon: <CarryOutFilled />, label: 'Yêu cầu', path: '/admin/requests' },
    { key: '3', icon: <OrderedListOutlined />, label: 'Việc làm', path: '/admin/jobs' },
    { key: '4', icon: <ProfileOutlined />, label: 'Thông tin cá nhân', path: '/admin/profile' },
    { key: '5', icon: <LogoutOutlined />, label: 'Đăng xuất', path: '/logout' },
  ]

  const findMenuItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key) return item
      if (item.children) {
        const found = findMenuItemByKey(item.children, key)
        if (found) return found
      }
    }
    return null
  }
  const handleClick = () => {
    navigate('/')
  }
  return (
    <>
      <Flex align='center' justify='center'>
        <div className='logo' onClick={handleClick}>
          <div className='box-logo'>
            <img src={logo} alt='logo' />
          </div>
        </div>
      </Flex>
      <Menu
        mode='inline'
        selectedKeys={[activeKey]}
        className='menu-bar'
        onClick={handleMenuClick}
        items={menuItems}
      />
    </>
  )
}

export default SideBarAdmin
