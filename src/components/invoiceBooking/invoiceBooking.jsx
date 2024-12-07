/* eslint-disable react/prop-types */
import { Button, Modal } from 'antd'
import './invoiceBooking.scss'
import { useEffect, useState } from 'react'
import { getBookingById } from '../../apis/booking.api'
import './invoiceBooking.scss'
const InvoiceBooking = ({ visible, onCancel, currentBooking }) => {
  const [data, setData] = useState([])
  const fetchUserBookings = async () => {
    try {
      const response = await getBookingById(currentBooking?.id)
      setData(response.data.data.user)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    if (visible) {
      fetchUserBookings()
    }
  }, [currentBooking])
  return (
    <Modal
      title='Chi tiết hóa đơn'
      className='invoice-modal'
      open={visible}
      onCancel={onCancel}
      footer={null}>
      <div className='invoice-content'>
        <div className='user-info'>
          <p>Họ tên: {data?.lastName + ' ' + data?.firstName}</p>
          <p>Số điện thoại: {data?.phoneNumber}</p>
          <p>Email: {data?.email}</p>
        </div>
        <div className='invoice-section'>
          <table className='invoice-table'>
            <tr>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
            </tr>
            <tr>
              <td>Services</td>
              <td>{currentBooking?.totalServicePrice} VND</td>
            </tr>
            <tr>
              <td>Rooms</td>
              <td>{currentBooking?.totalRoomPrice} VND</td>
            </tr>
          </table>
        </div>
        <div className='invoice-total'>
          <div>
            <p>
              Subtotal: {currentBooking?.totalServicePrice + currentBooking?.totalRoomPrice} VND
            </p>
            <p>Surcharges: 0 VND</p>
            <p>
              <strong>
                Total:
                {currentBooking?.totalServicePrice +
                  currentBooking?.totalRoomPrice +
                  (currentBooking?.surcharges[1]?.roomSurcharge || 0)}
                VND
              </strong>
            </p>
          </div>
        </div>
        <div className='invoice-btn'>
          <Button className='cancel-button' onClick={onCancel}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default InvoiceBooking
