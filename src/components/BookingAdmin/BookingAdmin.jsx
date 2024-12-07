import { Input, message, Modal, Pagination, Space, Table } from 'antd'
import './BookingAdmin.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  getAllBooking,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
  getBookingById,
} from '../../apis/booking.api'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import InvoiceBooking from '../invoiceBooking/invoiceBooking'
const BookingAdmin = () => {
  const CURRENT_DEFAULT = 1
  const PAGE_SIZE_DEFAULT = 10
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [pagination, setPagination] = useState({
    current: CURRENT_DEFAULT,
    size: PAGE_SIZE_DEFAULT,
  })
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(null)
  const [searchId, setSearchId] = useState('')

  const fetchBookings = async (bookingID = null) => {
    setLoading(true)
    try {
      if (bookingID) {
        const response = await getBookingById(bookingID)
        console.log('first', response)
        setData([response.data.data])
        setTotalItems(1)
      } else {
        const response = await getAllBooking({
          pageNum: pagination.current,
          pageSize: pagination.size,
        })
        setData(response.data.data.items)
        setTotalItems(response.data.data.meta.totalElements)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '80px',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'rooms',
      key: 'rooms',
      width: '200px',
      render: (rooms) => rooms?.[0]?.name || 'N/A',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '150px',
      render: (createdBy) => createdBy?.firstName || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user?.email || 'N/A',
    },
    {
      title: 'Tổng giá phòng',
      dataIndex: 'totalRoomPrice',
      key: 'totalRoomPrice',
      width: '150px',
    },
    {
      title: 'Tổng giá dịch vụ',
      dataIndex: 'totalServicePrice',
      key: 'totalServicePrice',
      width: '150px',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '150px',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '150px',
      fixed: 'right',
      render: (record) => (
        <Space size='middle'>
          <ImCancelCircle
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() => handleCancelBooking(record.id)}
          />
          <FaSignInAlt
            style={{ fontSize: '20px', cursor: 'pointer', color: 'green' }}
            onClick={() => handleCheckInBooking(record.id)}
          />
          <FaSignOutAlt
            style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }}
            onClick={() => handleCheckOut(record)}
          />
        </Space>
      ),
    },
  ]
  const calculateBodyTableHeight = () => {
    const height =
      window.innerHeight - 90 - 24 * 2 - 20 * 2 - 24 * 2 - 32 - 44 * 2 - 14 * 2 - 19 * 2
    return { y: `${height}px` }
  }
  const handleCancelBooking = async (BookingId) => {
    let tempNote = ''
    Modal.confirm({
      title: 'Xác nhận huỷ đặt phòng',
      content: (
        <Input.TextArea
          placeholder='Nhập lý do hủy đặt phòng'
          rows={4}
          onChange={(e) => (tempNote = e.target.value)}
        />
      ),
      okText: 'Huỷ',
      okType: 'danger',
      cancelText: 'Đóng',

      onOk: async () => {
        try {
          await cancelBooking(BookingId, { note: tempNote })
          message.success('Huỷ đặt phòng thành công')
          await fetchBookings()
        } catch (error) {
          message.error('Huỷ đặt phòng thất bại')
        }
      },
    })
  }
  const handleChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      size: pageSize || prev.size,
    }))
  }

  useEffect(() => {
    fetchBookings()
  }, [pagination])
  const handleCheckInBooking = async (id) => {
    try {
      await checkInBooking(id)
      message.success('Check in thành công')
      await fetchBookings()
    } catch (error) {
      message.error('Check in thất bại', error)
    }
  }
  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleCheckOut = async (data) => {
    try {
      await checkOutBooking(data.id)
      message.success('Check out thành công')
      await fetchBookings()
    } catch (error) {
      message.error('Check out thất bại', error)
    }
    setIsOpenModel(true)
    setCurrentBooking(data)
  }
  const handleSearch = async (value) => {
    if (value) {
      await fetchBookings(value)
    } else {
      await fetchBookings()
    }
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý dặt phòng</h1>
              <div className='search-bar'>
                <Input.Search
                  className='search-input'
                  placeholder='Tìm kiếm phòng đặt'
                  allowClear
                  onChange={(e) => setSearchId(e.target.value)}
                  onSearch={handleSearch}
                  value={searchId}
                />

                <InvoiceBooking
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  currentBooking={currentBooking}
                />
              </div>
            </div>
            <div className='table'>
              <Table
                className='table-content'
                columns={columns}
                dataSource={data}
                loading={loading}
                scroll={calculateBodyTableHeight()}
                pagination={false}
              />
              <Pagination
                current={pagination.current}
                pageSize={pagination.size}
                showSizeChanger
                onChange={handleChange}
                onShowSizeChange={handleChange}
                total={totalItems}
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  paddingRight: '10px 20px 15px 10px',
                  justifyContent: 'flex-end',
                  borderRadius: '0 0 20px 20px ',
                }}
                locale={{ items_per_page: '/ Trang' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingAdmin
