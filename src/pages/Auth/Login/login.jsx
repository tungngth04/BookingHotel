import './login.scss'
import SideBody from '../../../components/sideBody/sideBody'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { loginValidate } from '../../../utils/loginValidate'
import { login, register, verify } from '../../../apis/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import { registerValidate } from '../../../utils/registerValidate'

const Login = () => {
  const navigate = useNavigate()
  const authen = useAuth()
  const [isActive, setIsActive] = useState(false)
  const [registerStep, setRegisterStep] = useState(1)
  const [verificationStep, setVerificationStep] = useState(false)
  const handleRegisterClick = () => {
    setIsActive(true)
  }

  const handleLoginClick = () => {
    setIsActive(false)
  }
  const handleNextStep = () => {
    setRegisterStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setRegisterStep((prevStep) => prevStep - 1)
  }

  return (
    <>
      <SideBody />
      <div className='container'>
        <div className={`box ${isActive ? 'active' : ''}`}>
          {/* Login Form */}
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
            {verificationStep ? (
              <Formik
                initialValues={{
                  email: '',
                  token: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true)
                  const dataToSend = {
                    email: values.email,
                    token: values.token,
                  }
                  try {
                    const res = await verify(dataToSend)
                    if (res.status === 'SUCCESS') {
                      toast.success('Xác thực thành công!')
                      setVerificationStep(false)
                      setIsActive(false)
                    }
                  } catch (error) {
                    if (error.response?.data?.message === 'Token hết hạn') {
                      toast.error('Mã xác thực đã hết hạn. Vui lòng đăng ký lại.')
                      setVerificationStep(false)
                    } else {
                      toast.error('Xác thực thất bại. Vui lòng thử lại.')
                    }
                  } finally {
                    setSubmitting(false)
                  }
                }}>
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <h1>Xác thực Email</h1>
                    <div className='input-box'>
                      <Field type='email' name='email' placeholder='Email' />
                      <MailOutlined />
                    </div>
                    <div className='input-box'>
                      <Field type='text' name='token' placeholder='Nhập mã xác thực' />
                    </div>
                    {errors.token && touched.token && <p className='errorMsg'>{errors.token}</p>}
                    <button type='submit' className='btn' disabled={isSubmitting}>
                      Xác thực
                    </button>
                    {!verificationStep && (
                      <button
                        type='button'
                        className='btn'
                        onClick={() => setVerificationStep(false)}>
                        Quay lại Đăng ký
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  email: '',
                  phoneNumber: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  gender: '',
                  birthday: '',
                  address: '',
                  avatarFile: null,
                }}
                validationSchema={registerValidate()}
                onSubmit={async (values) => {
                  try {
                    const formData = new FormData()
                    formData.append(
                      'gender',
                      values.gender.charAt(0).toUpperCase() + values.gender.slice(1),
                    )
                    Object.keys(values).forEach((key) => {
                      if (key !== 'gender') {
                        formData.append(key, values[key])
                      }
                    })
                    const res = await register(formData)
                    if (res.status === 'SUCCESS') {
                      toast.success('Đăng ký thành công!')
                      setVerificationStep(true)
                      console.log('After register, verificationStep:', verificationStep)
                    }
                  } catch (error) {
                    toast.error('Đăng ký thất bại. Vui lòng thử lại.')
                  }
                }}>
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <h1>Đăng ký</h1>
                    <div className='signup-box'>
                      {registerStep === 1 && (
                        <>
                          <div className='input-box'>
                            <Field type='email' name='email' placeholder='Email' />
                            <MailOutlined />
                          </div>
                          {errors.email && touched.email && (
                            <p className='errorMsg'>{errors.email}</p>
                          )}
                          <div className='input-box'>
                            <Field type='text' name='phoneNumber' placeholder='PhoneNumber' />
                            <PhoneOutlined />
                          </div>
                          {errors.phoneNumber && touched.phoneNumber && (
                            <p className='errorMsg'>{errors.phoneNumber}</p>
                          )}
                          <div className='input-box'>
                            <Field type='password' name='password' placeholder='Password' />
                            <LockOutlined />
                          </div>
                          {errors.password && touched.password && (
                            <p className='errorMsg'>{errors.password}</p>
                          )}
                        </>
                      )}
                      {registerStep === 2 && (
                        <>
                          <div className='input-box'>
                            <Field type='text' name='firstName' placeholder='First Name' />
                            <UserOutlined />
                          </div>
                          {errors.firstName && touched.firstName && (
                            <p className='errorMsg'>{errors.firstName}</p>
                          )}
                          <div className='input-box'>
                            <Field type='text' name='lastName' placeholder='Last Name' />
                            <UserOutlined />
                          </div>
                          {errors.lastName && touched.lastName && (
                            <p className='errorMsg'>{errors.lastName}</p>
                          )}
                          <div className='input-box'>
                            <Field type='date' name='birthday' placeholder='Birthday' />
                          </div>
                          {errors.birthday && touched.birthday && (
                            <p className='errorMsg'>{errors.birthday}</p>
                          )}
                        </>
                      )}
                      {registerStep === 3 && (
                        <>
                          <div className='input-box'>
                            <Field type='text' name='address' placeholder='Address' />
                          </div>
                          {errors.address && touched.address && (
                            <p className='errorMsg'>{errors.address}</p>
                          )}
                          <div className='input-box'>
                            <Field as='select' name='gender'>
                              <option value='Male'>Male</option>
                              <option value='Female'>Female</option>
                              <option value='other'>Other</option>
                            </Field>
                          </div>
                          {errors.gender && touched.gender && (
                            <p className='errorMsg'>{errors.gender}</p>
                          )}
                          <div className='input-box'>
                            <input
                              type='file'
                              onChange={(event) => {
                                setFieldValue('avatarFile', event.target.files[0])
                              }}
                            />
                          </div>
                          {errors.avatarFile && touched.avatarFile && (
                            <p className='errorMsg'>{errors.avatarFile}</p>
                          )}
                        </>
                      )}
                    </div>

                    <div className='button'>
                      {registerStep > 1 && (
                        <button
                          className='btn'
                          onClick={(e) => {
                            e.preventDefault()
                            handlePrevStep()
                          }}>
                          Quay lại
                        </button>
                      )}
                      {registerStep < 3 && (
                        <button
                          className='btn'
                          onClick={(e) => {
                            e.preventDefault()
                            handleNextStep()
                          }}>
                          Tiếp tục
                        </button>
                      )}
                      {registerStep === 3 && (
                        <button type='submit' className='btn'>
                          Đăng ký
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            )}
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
                Register Now
              </button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h1>Hello, Welcome!</h1>
              <p>Already have account?</p>
              <button
                className='btn btn-login'
                onClick={(e) => {
                  e.preventDefault()
                  handleLoginClick()
                }}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
