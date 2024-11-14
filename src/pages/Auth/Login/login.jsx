import './login.scss'
import SideBody from '../../../components/sideBody/sideBody'
import Register from '../Register/register'
import { useState } from 'react'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const toggleForm = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <>
      <SideBody />
      <div className='auth'>
        {/* Container cho cả hai form */}
        <div className={`form-container ${isSignUp ? 'right-panel-active' : ''}`}>
          {/* Form đăng ký */}
          <div className={`form sign-up-form ${isSignUp ? 'showSignUp' : 'bounceRight'}`}>
            <Register />
          </div>

          {/* Form đăng nhập */}
          <div className={`form login-form ${isSignUp ? 'bounceLeft' : ''}`}>
            <h2>ĐĂNG NHẬP</h2>
            <form>
              <input type='email' placeholder='Email' />
              <input type='password' placeholder='Mật khẩu' />
              <div className='btn'>
                <a href='#'>Quên mật khẩu?</a>
                <button type='submit'>GỬI</button>
              </div>
            </form>
          </div>

          {/* Overlay chứa hai nút chuyển đổi */}
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h2>Đã có tài khoản?</h2>
              <p>
                Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street
                art fap.
              </p>
              <button className='ghost' onClick={toggleForm}>
                LOGIN
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h2>Không có tài khoản?</h2>
              <p>
                Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street
                art fap.
              </p>
              <button className='ghost' onClick={toggleForm}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
