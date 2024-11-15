import { Flex, Menu } from 'antd'
import logo from '../../assets/images/logo-hotel.png'
import './SideBarAdmin.scss'
import {
  BookOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
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
        { key: '1-1', icon: <HomeOutlined />, label: 'Quản lý Phòng', path: '/admin/rooms' },
        { key: '1-2', icon: <UserOutlined />, label: 'Quản lý khách hàng', path: '/admin/users' },
        { key: '1-3', icon: <ShoppingCartOutlined />, label: 'Quản lý sale', path: '/admin/sales' },
        { key: '1-4', icon: <BookOutlined />, label: 'Quản lý đặt phòng', path: '/admin/bookings' },
        {
          key: '1-5',
          icon: <SolutionOutlined />,
          label: 'Quản lý dịch vụ',
          path: '/admin/services',
        },
        {
          key: '1-6',
          icon: <ShoppingOutlined />,
          label: 'Quản lý sản phẩm',
          path: '/admin/products',
        },
      ],
    },
    { key: '2', icon: <DashboardOutlined />, label: 'Thống kê', path: '/admin/requests' },
    { key: '3', icon: <ProfileOutlined />, label: 'Thông tin cá nhân', path: '/admin/statistic' },
    { key: '4', icon: <LogoutOutlined />, label: 'Đăng xuất', path: '/logout' },
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
