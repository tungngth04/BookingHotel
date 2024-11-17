/* eslint-disable react/prop-types */
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd'
import './CreateRoomModal.scss'
import { useEffect, useState } from 'react'
import { createRoom, updateRoom } from '../../apis/room.api'
import toast from 'react-hot-toast'
const CreateRoomModal = ({ visible, onCancel, onRoomCreated, isUpdate, currentRoom }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    name: '',
    price: null,
    type: '',
    bed: '',
    size: null,
    capacity: null,
    services: '',
    description: '',
    files: [],
  })
  useEffect(() => {
    if (isUpdate && currentRoom) {
      setFormData({
        name: currentRoom.name || '',
        price: currentRoom.price || null,
        type: currentRoom.type || '',
        bed: currentRoom.bed || '',
        size: currentRoom.size || null,
        capacity: currentRoom.capacity || null,
        services: currentRoom.services || '',
        description: currentRoom.description || '',
        files: [],
      })
      form.setFieldsValue({
        name: currentRoom.name || '',
        price: currentRoom.price || null,
        type: currentRoom.type || '',
        bed: currentRoom.bed || '',
        size: currentRoom.size || null,
        capacity: currentRoom.capacity || null,
        services: currentRoom.services || '',
        description: currentRoom.description || '',
        files: [],
      })
    }
  }, [isUpdate, currentRoom])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  const hanldeSubmit = async () => {
    if (!formData.name || !formData.price || !formData.type) {
      message.error('Vui lòng nhập đầy đủ thông tin bắt buộc!')
      return
    }
    try {
      setLoading(true)
      if (isUpdate) {
        await updateRoom(currentRoom.id, formData)
        message.success('Cập nhật phòng thành công!')
      } else {
        await createRoom(formData)
        message.success('Tạo phòng mới thành công!')
      }
      setFormData({
        name: '',
        price: null,
        type: '',
        bed: '',
        size: null,
        capacity: null,
        services: '',
        description: '',
        files: [],
      })
      onCancel()

      onRoomCreated()
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    }
  }

  return (
    <Modal
      title={isUpdate ? 'Cập nhật phòng' : 'Tạo phòng mới'}
      className='create-room-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <Form form={form} onFinishFailed={() => message.error('Vui lòng kiểm tra lại thông tin!')}>
        <div className='left-column'>
          <Form.Item
            label='Tên phòng'
            name='name'
            rules={[
              {
                required: true,
                message: 'Tên phòng là bắt buộc!',
                style: 'justify-content: flex-end',
              },
            ]}>
            <Input
              className='input'
              value={formData.name}
              placeholder='Nhập tên phòng'
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Giá'
            name='price'
            rules={[{ required: true, message: 'Giá phòng là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.price}
              placeholder='Nhập giá phòng'
              onChange={(value) => handleInputChange('price', value)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label='Loại phòng'
            name='type'
            rules={[{ required: true, message: 'Loại phòng là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.type}
              placeholder='Nhập Loại phòng'
              onChange={(e) => handleInputChange('type', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Số giường'
            name='bed'
            rules={[{ required: true, message: 'Số giường là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.bed}
              placeholder='Nhập số giường'
              onChange={(e) => handleInputChange('bed', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Kích thước'
            name='size'
            rules={[{ required: true, message: 'Kích thước là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.size}
              placeholder='Nhập kích thước'
              onChange={(value) => handleInputChange('size', value)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>
        <div className='right-column'>
          <Form.Item
            label='Sức chứa'
            name='capacity'
            rules={[{ required: true, message: 'Sức chứa là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.capacity}
              placeholder='Nhập sức chứa'
              onChange={(value) => handleInputChange('capacity', value)}
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label='Dịch vụ'
            name='services'
            rules={[{ required: true, message: 'Dịch vụ là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.services}
              placeholder='Nhập dịch vụ'
              onChange={(e) => handleInputChange('services', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Mô tả'
            name='description'
            rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}>
            <Input.TextArea
              className='input'
              value={formData.description}
              placeholder='Nhập mô tả phòng'
              rows={4}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Tải lên ảnh' name='files'>
            <Upload
              maxCount={1}
              accept='image/png, image/jpeg'
              fileList={formData.files}
              beforeUpload={(file) => {
                setFormData((prev) => ({
                  ...prev,
                  files: [file],
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
            {isUpdate ? 'Cập nhật Phòng' : 'Tạo Phòng'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateRoomModal
