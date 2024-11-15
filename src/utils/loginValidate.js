import * as Yup from 'yup'

export const loginValidate = () =>
  Yup.object({
    emailOrPhone: Yup.string()
      .required('Vui lòng nhập tên người dùng.')
      .min(3, 'Tên người dùng phải có ít nhất 3 ký tự.'),
    password: Yup.string().required('Vui lòng nhập mật khẩu.'),
  })
