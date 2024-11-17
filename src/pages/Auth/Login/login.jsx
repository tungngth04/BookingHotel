import './login.scss'
import SideBody from '../../../components/sideBody/sideBody'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { loginValidate } from '../../../utils/loginValidate'
import { login } from '../../../apis/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
const Login = () => {
  const navigate = useNavigate()
  const authen = useAuth()
  const [isActive, setIsActive] = useState(false)

  const handleRegisterClick = () => {
    setIsActive(true)
  }

  const handleLoginClick = () => {
    setIsActive(false)
  }
  return (
    <>
      <SideBody />
      <div className='container'>
        <div className={`box ${isActive ? 'active' : ''}`}>
          <div className='form-box form-login'>
            <Formik
              initialValues={{
                emailOrPhone: '',
                password: '',
              }}
              validationSchema={loginValidate()}
              onSubmit={async (values) => {
                try {
                  const res = await login(values)
                  if (res.data?.data) {
                    const roles = res.data.data.authorities
                    authen.saveUser({
                      token: res.data.data.accessToken,
                    })
                    const authorities = roles.map((role) => role.authority)
                    if (authorities.includes('ROLE_ADMIN')) {
                      navigate('/admin')
                      toast.success('Đăng nhập thành công với vai trò Quản trị viên!')
                    } else if (authorities.includes('ROLE_USER')) {
                      navigate('/')
                      toast.success('Đăng nhập thành công với vai trò Người dùng!')
                    }
                  } else {
                    toast.error('Không tìm thấy token. Vui lòng thử lại!')
                  }
                } catch (error) {
                  if (error?.code === 'ERR_NETWORK') {
                    toast.error('Mất kết nối, kiểm tra kết nối mạng của bạn')
                  } else if (error?.response?.data?.message) {
                    toast.error(error.response.data.message)
                  } else {
                    toast.error('Có lỗi xảy ra! Vui lòng thử lại sau.')
                  }
                  console.error('API Error:', error.response || error.message)
                }
              }}>
              {({ errors, touched }) => (
                <Form>
                  <h1>Đăng nhập</h1>

                  <div className='input-box'>
                    <Field type='text' name='emailOrPhone' placeholder='Username' />
                    <UserOutlined />
                  </div>
                  {errors.emailOrPhone && touched.emailOrPhone ? (
                    <p className='errorMsg'>{errors.emailOrPhone}</p>
                  ) : null}

                  <div className='input-box'>
                    <Field type='password' name='password' placeholder='Password' />
                    <LockOutlined />
                  </div>
                  {errors.password && touched.password ? (
                    <p className='errorMsg'>{errors.password}</p>
                  ) : null}
                  <div className='form-box forgot-password'>
                    <a href='#'>Forgot Password?</a>
                  </div>
                  <button type='submit' className='btn'>
                    Đăng nhập
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className='form-register'>
            <form action=''>
              <h1>Đăng ký</h1>
              <div className='input-box'>
                <input type='text' placeholder='Username' />
                <UserOutlined />
              </div>
              <div className='input-box'>
                <input type='email' placeholder='Email' />
                <MailOutlined />
              </div>
              <div className='input-box'>
                <input type='password' placeholder='Password' required />
                <LockOutlined />
              </div>
              <div className='forgot-password'>
                <a href='#'>Forgot Password?</a>
              </div>
              <button type='submit' className='btn'>
                Đăng ký
              </button>
            </form>
          </div>

          <div className='toggle-box'>
            <div className='toggle-panel toggle-left'>
              <h1>Hello, Welcome!</h1>
              <p>Don have account?</p>
              <button
                className='btn btn-register'
                onClick={(e) => {
                  e.preventDefault()
                  handleRegisterClick()
                }}>
                Đăng ký
              </button>
            </div>

            <div className='toggle-panel toggle-right'>
              <h1>Welcome Back!</h1>
              <p>Already have account?</p>
              <button
                className='btn btn-login'
                onClick={(e) => {
                  e.preventDefault()
                  handleLoginClick()
                }}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
