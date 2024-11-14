import './register.scss'
const Register = () => {
  return (
    <>
      <div className='sign-up-form'>
        <h2>ĐĂNG KÝ</h2>
        <form>
          <input type='email' placeholder='Email' />
          <input type='phone' placeholder='Số điện thoại' />
          <input type='password' placeholder='Mật khẩu' />
          <input type='text' placeholder='Họ' />
          <input type='text' placeholder='Tên' />

          <div className='gender-selection'>
            <label>
              <input type='radio' name='gender' value='nam' /> Nam
            </label>
            <label>
              <input type='radio' name='gender' value='nu' /> Nữ
            </label>
          </div>

          <input type='date' placeholder='Ngày sinh' className='date' />
          <input type='text' placeholder='Address' />

          <button type='submit'>GỬI</button>
        </form>
      </div>
    </>
  )
}

export default Register
