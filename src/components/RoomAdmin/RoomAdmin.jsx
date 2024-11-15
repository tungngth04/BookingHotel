import { Button, Input, message, Modal, Space, Table } from 'antd'
import './RoomAdmin.scss'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteRoom, getAllRoom } from '../../apis/room.api'
const RoomAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchRooms = async () => {
    setLoading(true)
    try {
      const response = await getAllRoom({ deleteFlag: false })
      setData(response.data.data.items)
      console.log('first, ', response.data.data.items)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchRooms()
  }, [])

  const columns = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '80px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '150px',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '100px',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '150px',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      width: '100px',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: '80px',
    },
    {
      title: 'Bed',
      dataIndex: 'bed',
      key: 'bed',
      width: '150px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      fixed: 'right',
      render: (_, __, index) => (
        <Space size='middle'>
          <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <DeleteOutlined
            style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(index)} // Truyền `index` vào handleDelete
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
  const handleDelete = async (roomId) => {
    // roomId là số thứ tự trong mảng (index)
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa phòng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          // Gọi API xóa phòng, roomId là index trong mảng
          await deleteRoom(roomId) // Gọi API xóa phòng theo `roomId` (index)
          message.success('Xóa phòng thành công')

          // Cập nhật lại state bằng cách loại bỏ phần tử tại roomId (index)
          setData((prevData) => prevData.filter((_, i) => i !== roomId))
        } catch (error) {
          console.error('Error deleting room:', error)
          message.error('Xóa phòng thất bại')
        }
      },
    })
  }

  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý phòng</h1>
              <div className='search-bar'>
                <Input.Search
                  className='search-input'
                  placeholder='Tìm kiếm thành viên'
                  allowClear
                />
                <Button>
                  <PlusCircleOutlined /> Thêm
                </Button>
              </div>
            </div>
            <div className='table'>
              <Table
                className='table-content'
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ locale: { items_per_page: '/ Trang' } }}
                scroll={calculateBodyTableHeight()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomAdmin
