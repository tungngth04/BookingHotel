/* eslint-disable react/prop-types */
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd'
import './createServiceModal.scss'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createService, updateService } from '../../apis/service.api'
const CreateServiceModal = ({ visible, onCancel, onServiceCreated, isUpdate, currentService }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    title: '',
    thumbnailFile: [],
    price: null,
    description: '',
  })
  console.log('ádasdasd', formData.thumbnailFile)
  useEffect(() => {
    if (isUpdate && currentService) {
      setFormData({
        name: currentService.name || '',
        thumbnailFile: [],
        price: currentService.price || null,
        description: currentService.description || '',
      })
      form.setFieldsValue({
        name: currentService.name || '',
        thumbnailFile: [],
        price: currentService.price || null,
        description: currentService.description || '',
      })
    }
  }, [isUpdate, currentService])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  const hanldeSubmit = async () => {
    if (!formData.title || !formData.price || !formData.description) {
      message.error('Vui lòng nhập đầy đủ thông tin bắt buộc!')
      return
    }
    try {
      setLoading(true)
      if (isUpdate) {
        await updateService(currentService.id, formData)
        message.success('Cập nhật dịch vụ thành công!')
      } else {
        await createService(formData)
        message.success('Tạo dịch vụ mới thành công!')
      }
      setFormData({
        name: '',
        thumbnailFile: [],
        description: '',
        serviceId: null,
      })
      onCancel()
      onServiceCreated()
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={isUpdate ? 'Cập nhật dịch vụ' : 'Tạo dịch vụ mới'}
      className='create-service-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <Form
        form={form}
        onFinish={hanldeSubmit}
        onFinishFailed={() => message.error('Vui lòng kiểm tra lại thông tin!')}>
        <div className='left-column'>
          <Form.Item
            label='Kiểu dịch vụ'
            name='title'
            rules={[
              {
                required: true,
                message: 'Kiểu dịch vụ là bắt buộc!',
                style: 'justify-content: flex-end',
              },
            ]}>
            <Input
              className='input'
              value={formData.title}
              placeholder='Nhập kiểu dịch vụ'
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Tải lên ảnh' name='files '>
            <Upload
              maxCount={1}
              accept='image/png, image/jpeg'
              fileList={formData.thumbnailFile}
              //   onChange={handleFileChange}
              beforeUpload={(file) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnailFile: [file],
                }))
                return false
              }}>
              <Button icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='Giá'
            name='price'
            rules={[{ required: true, message: 'Giá dịch vụ là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.price}
              placeholder='Nhập giá dịch vụ'
              onChange={(value) => handleInputChange('price', value)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label='Mô tả'
            name='description'
            rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}>
            <Input.TextArea
              className='input'
              value={formData.description}
              placeholder='Nhập mô tả sản phẩm'
              rows={4}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: 'right' }} className='form-action'>
          <Button style={{ marginRight: '8px' }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            {isUpdate ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateServiceModal
