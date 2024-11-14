import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import './HeaderUser.scss'
import { Button } from 'antd'
import logo from '../../assets/images/logo-hotel.png'

const HeaderUser = () => {
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
              <Button className='btn-login'>LOGIN</Button>
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
              <li>HOME</li>
              <li>ROOMS</li>
              <li>ABOUT US</li>
              <li>BLOGS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderUser
