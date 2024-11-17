/* eslint-disable react/prop-types */
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd'
import './createUserModal.scss'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { updateUser } from '../../apis/user.api'
const CreateUserModal = ({ visible, onCancel, onUserCreated, currentUser }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    birthday: '',
    address: '',
    fileAvatar: [],
  })
  useEffect(() => {
    if (currentUser) {
      setFormData({
        phoneNumber: currentUser.phoneNumber || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        birthday: currentUser.birthday || '',
        address: currentUser.address || '',
        fileAvatar: [],
      })
      form.setFieldsValue({
        phoneNumber: currentUser.phoneNumber || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        birthday: currentUser.birthday || '',
        address: currentUser.address || '',
        fileAvatar: [],
      })
    }
  }, [currentUser])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  const hanldeSubmit = async () => {
    if (
      !formData.phoneNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthday ||
      !formData.address
    ) {
      message.error('Vui lòng nhập đầy đủ thông tin bắt buộc!')
      return
    }
    try {
      setLoading(true)

      await updateUser(currentUser.id, formData)
      message.success('Cập nhật phòng thành công!')
      setFormData({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        birthday: '',
        address: '',
        fileAvatar: [],
      })
      onCancel()

      onUserCreated()
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    }
  }

  return (
    <Modal
      title='Cập nhật người dùng'
      className='create-user-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <Form form={form} onFinishFailed={() => message.error('Vui lòng kiểm tra lại thông tin!')}>
        <div className='left-column'>
          <Form.Item
            label='Số điện thoại'
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: 'Số điện thoại là bắt buộc!',
                style: 'justify-content: flex-end',
              },
            ]}>
            <Input
              className='input'
              value={formData.phoneNumber}
              placeholder='Nhập số điện thoại'
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='First name'
            name='firstName'
            rules={[{ required: true, message: 'First name là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.firstName}
              placeholder='Nhập first name'
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Last name'
            name='lastName'
            rules={[{ required: true, message: 'Last name là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.lastName}
              placeholder='Nhập last name'
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Ngày sinh'
            name='birthday'
            rules={[{ required: true, message: 'Ngày sinh là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.birthday}
              placeholder='Nhập ngày sinh'
              onChange={(value) => handleInputChange('birthday', value)}
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label='Địa chỉ'
            name='address'
            rules={[{ required: true, message: 'Địa chỉ là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.address}
              placeholder='Nhập địa chỉ'
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </Form.Item>

          <Form.Item label='Tải lên ảnh' name='files'>
            <Upload
              maxCount={1}
              accept='image/png, image/jpeg'
              fileList={formData.fileAvatar}
              beforeUpload={(file) => {
                setFormData((prev) => ({
                  ...prev,
                  fileAvatar: [file],
                }))
                return false
              }}>
              <Button icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>
        </div>
        <div style={{ textAlign: 'right' }} className='form-action'>
          <Button style={{ marginRight: '8px' }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={loading} onClick={hanldeSubmit}>
            Cập nhật người dùng
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
