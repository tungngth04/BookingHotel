import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import './HeaderUser.scss'
import { Button } from 'antd'
import logo from '../../assets/images/logo-hotel.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { logout } from '../../apis/auth.api'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const HeaderUser = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const currentUser = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('BookingHotel-auth')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleTabClick = (path) => {
    setActiveTab(path)
  }

  const hanldeLogOut = async () => {
    try {
      await logout()
      currentUser.clearUser()
      setIsLoggedIn(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Đã xảy ra lỗi khi đăng xuất!')
    }
  }

  return (
    <div className='header-section'>
      <div className='box'>
        <div className='top-nav'>
          <div className='row'>
            <div className='col1'>
              <div className='phone'>
                <PhoneOutlined />
                <p>0-842343</p>
              </div>
              <div className='email'>
                <MailOutlined />
                <p>thddhotelluxury@gmail.com</p>
              </div>
            </div>
            <div className='col2'>
              <Button className='btn-booking'>BOOKING NOW</Button>
              {isLoggedIn ? (
                <Button className='btn-logout' onClick={hanldeLogOut}>
                  LOGOUT
                </Button>
              ) : (
                <Button className='btn-login' onClick={() => navigate('/login')}>
                  LOGIN
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='box2'>
        <div className='menu'>
          <div className='logo-user'>
            <img src={logo} alt='THDD'></img>
          </div>
          <div className='nav-menu'>
            <ul className='ul-menu'>
              <li className={activeTab === '/' ? 'active' : ''} onClick={() => handleTabClick('/')}>
                <Link to='/'>HOME</Link>
              </li>
              <li
                className={activeTab === '/rooms' ? 'active' : ''}
                onClick={() => handleTabClick('/rooms')}>
                <Link to='/rooms'>ROOMS</Link>
              </li>
              <li
                className={activeTab === '/about-us' ? 'active' : ''}
                onClick={() => handleTabClick('/about-us')}>
                <Link to='/about-us'>ABOUT US</Link>
              </li>
              <li className={activeTab === '/blogs' ? 'active' : ''}>BLOGS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderUser
