/* eslint-disable react/prop-types */
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd'
import './createProductModal.scss'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createProduct, updateProduct } from '../../apis/product.api'
const CreateProductModal = ({ visible, onCancel, onProductCreated, isUpdate, currentProduct }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    name: '',
    thumbnailFile: [],
    description: '',
    serviceId: null,
  })
  console.log('ádasdasd', formData.thumbnailFile)
  useEffect(() => {
    if (isUpdate && currentProduct) {
      setFormData({
        name: currentProduct.name || '',
        thumbnailFile: [],
        description: currentProduct.description || '',
        serviceId: currentProduct.serviceId || null,
      })
      form.setFieldsValue({
        name: currentProduct.name || '',
        thumbnailFile: [],
        description: currentProduct.description || '',
        serviceId: currentProduct.serviceId || null,
      })
    }
  }, [isUpdate, currentProduct])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const hanldeSubmit = async () => {
    if (!formData.name || !formData.serviceId || !formData.description) {
      message.error('Vui lòng nhập đầy đủ thông tin bắt buộc!')
      return
    }
    try {
      setLoading(true)
      if (isUpdate) {
        await updateProduct(currentProduct.id, formData)
        message.success('Cập nhật phòng thành công!')
      } else {
        await createProduct(formData)
        message.success('Tạo phòng mới thành công!')
      }
      setFormData({
        name: '',
        thumbnailFile: [],
        description: '',
        serviceId: null,
      })
      onCancel()
      onProductCreated()
    } catch (error) {
      if (error.mesaage) {
        toast.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    }
  }

  return (
    <Modal
      title={isUpdate ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
      className='create-product-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <Form form={form} onFinishFailed={() => message.error('Vui lòng kiểm tra lại thông tin!')}>
        <div className='left-column'>
          <Form.Item
            label='Tên sản phẩm'
            name='name'
            rules={[
              {
                required: true,
                message: 'Tên sản phẩm là bắt buộc!',
                style: 'justify-content: flex-end',
              },
            ]}>
            <Input
              className='input'
              value={formData.name}
              placeholder='Nhập tên sản phẩm'
              onChange={(e) => handleInputChange('name', e.target.value)}
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
          <Form.Item
            label='Id dịch vụ'
            name='serviceId'
            rules={[{ required: true, message: 'Id dịch vụ là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.serviceId}
              placeholder='Nhập id dịch vụ'
              onChange={(value) => handleInputChange('serviceId', value)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: 'right' }} className='form-action'>
          <Button style={{ marginRight: '8px' }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={loading} onClick={hanldeSubmit}>
            {isUpdate ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateProductModal
