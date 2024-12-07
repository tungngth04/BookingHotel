import * as Yup from 'yup'

export const registerValidate = () =>
  Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    phoneNumber: Yup.string().required('Bắt buộc'),
    password: Yup.string().required('Bắt buộc'),
    firstName: Yup.string().required('Bắt buộc'),
    lastName: Yup.string().required('Bắt buộc'),
    gender: Yup.string().required('Bắt buộc'),
    birthday: Yup.date().required('Bắt buộc'),
    address: Yup.string().required('Bắt buộc'),
    avatarFile: Yup.mixed().required('Bắt buộc'),
  })
