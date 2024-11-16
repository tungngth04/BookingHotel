/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, message, Modal } from 'antd'
import './createSaleModal.scss'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createSale, updateSale } from '../../apis/sale.api'
import moment from 'moment'
const CreateSaleModal = ({ visible, onCancel, onSaleCreated, isUpdate, currentSale }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    dayStart: '',
    dayEnd: '',
    salePercent: null,
  })
  console.log('ádasdasd', formData.thumbnailFile)
  useEffect(() => {
    if (isUpdate && currentSale) {
      setFormData({
        dayStart: currentSale.dayStart || '',
        dayEnd: currentSale.dayEnd || '',
        salePercent: currentSale.salePercent || null,
      })
      form.setFieldsValue({
        dayStart: currentSale.dayStart || '',
        dayEnd: currentSale.dayEnd || '',
        salePercent: currentSale.salePercent || null,
      })
    }
  }, [isUpdate, currentSale])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  const hanldeSubmit = async () => {
    if (!formData.dayStart || !formData.dayEnd || !formData.salePercent) {
      message.error('Vui lòng nhập đầy đủ thông tin bắt buộc!')
      return
    }
    const formattedDayStart = moment(formData.dayStart).toISOString()
    const formattedDayEnd = moment(formData.dayEnd).toISOString()
    try {
      setLoading(true)
      const saleData = {
        ...formData,
        dayStart: formattedDayStart,
        dayEnd: formattedDayEnd,
      }
      if (isUpdate) {
        await updateSale(currentSale.id, saleData)
        message.success('Cập nhật phòng thành công!')
      } else {
        await createSale(saleData)
        message.success('Tạo phòng mới thành công!')
      }
      setFormData({
        dayStart: '',
        dayEnd: '',
        salePercent: null,
      })
      onCancel()
      onSaleCreated()
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
      title={isUpdate ? 'Cập nhật sale' : 'Tạo sale mới'}
      className='create-sale-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <Form
        form={form}
        onFinish={hanldeSubmit}
        onFinishFailed={() => message.error('Vui lòng kiểm tra lại thông tin!')}>
        <div className='left-column'>
          <Form.Item
            label='Ngày bắt đầu'
            name='dayStart'
            rules={[
              {
                required: true,
                message: 'Ngày bắt đầu là bắt buộc!',
                style: 'justify-content: flex-end',
              },
            ]}>
            <Input
              className='input'
              value={formData.dayStart}
              placeholder='Nhập ngày bắt đầu'
              onChange={(e) => handleInputChange('dayStart', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Ngày kết thúc'
            name='dayEnd'
            rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc!' }]}>
            <Input
              className='input'
              value={formData.dayEnd}
              placeholder='Nhập Ngày kết thúc'
              rows={4}
              onChange={(e) => handleInputChange('dayEnd', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Giá'
            name='salePercent'
            rules={[{ required: true, message: 'Giá sale là bắt buộc!' }]}>
            <InputNumber
              className='input'
              value={formData.salePercent}
              placeholder='Nhập giá sale'
              onChange={(value) => handleInputChange('salePercent', value)}
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: 'right' }} className='form-action'>
          <Button style={{ marginRight: '8px' }} onClick={onCancel}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            {isUpdate ? 'Cập nhật sale' : 'Tạo sale'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateSaleModal
