import './sideAdmin.scss'
import logo from '../../assets/images/logo-hotel.png'
const SideAdmin = () => {
  return (
    <>
      <div className='side-admin' style={{ flex: 1 }}>
        <h2>Profile</h2>
        <div className='content-side-admin'>
          <div className='avatar'>
            <img src={logo} alt='logo' />
            <h3>Nguyễn Tùng</h3>
            <span>Role: Admin</span>
          </div>
          <div className='infor'></div>
        </div>
      </div>
    </>
  )
}

export default SideAdmin
