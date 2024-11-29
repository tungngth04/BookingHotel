import { Button, Input, message, Modal, Pagination, Space, Table, Tabs } from 'antd'
import './RoomAdmin.scss'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteRoom, deleteTrashRoom, getAllRoom, restoreRoom } from '../../apis/room.api'
import CreateRoomModal from '../CreateRoomModal/CreateRoomModal'
import { FaTrashRestoreAlt } from 'react-icons/fa'
const RoomAdmin = () => {
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
  const [isUpdate, setIsUpdate] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [flag, setFlag] = useState(false)
  const fetchRooms = async () => {
    setLoading(true)
    try {
      const response = await getAllRoom({
        deleteFlag: flag,
        pageNum: pagination.current,
        pageSize: pagination.size,
      })
      setData(response.data.data.items)
      setTotalItems(response.data.data.meta.totalElements)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

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
      render: (record) => (
        <Space size='middle'>
          {flag ? (
            <FaTrashRestoreAlt
              style={{ fontSize: '16px', cursor: 'pointer' }}
              onClick={() => handleRestore(record.id)}
            />
          ) : (
            <EditOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={() => handleUpdate(record)}
            />
          )}

          <DeleteOutlined
            style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(record.id)}
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
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: flag
        ? 'Bạn có chắc chắn muốn xóa vĩnh viễn phòng này?'
        : 'Bạn có chắc chắn muốn xóa phòng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          if (flag) {
            await deleteTrashRoom(roomId)
          } else {
            await deleteRoom(roomId)
          }
          message.success('Xóa phòng thành công')
          setData((prevData) => prevData.filter((room) => room.id !== roomId))
        } catch (error) {
          console.error('Lỗi xoá phòng:', error)
          message.error('Xóa phòng thất bại')
        }
      },
    })
  }
  const handleRestore = async (roomId) => {
    try {
      await restoreRoom(roomId)
      message.success('Khôi phục phòng thành công')
      setData((prevData) => prevData.filter((room) => room.id !== roomId))
    } catch (error) {
      console.error('Lỗi khôi phục phòng:', error)
      message.error('Khôi phục phòng thất bại')
    }
  }

  const handleChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      size: pageSize || prev.size,
    }))
  }

  useEffect(() => {
    fetchRooms()
  }, [pagination, flag])

  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleUpdate = (data) => {
    setIsOpenModel(true)
    setIsUpdate(true)
    setCurrentRoom(data)
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
                <Button
                  onClick={() => {
                    setIsOpenModel(true), setIsUpdate(false)
                  }}>
                  <PlusCircleOutlined /> Thêm
                </Button>
                <CreateRoomModal
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  onRoomCreated={fetchRooms}
                  isUpdate={isUpdate}
                  currentRoom={currentRoom}
                />
              </div>
            </div>
            <Tabs
              defaultActiveKey='1'
              type='card'
              onChange={(key) => setFlag(key == '2')}
              items={[
                {
                  label: <>Room</>,
                  key: '1',
                  children: null,
                },
                {
                  label: (
                    <>
                      <DeleteOutlined /> Trash
                    </>
                  ),
                  key: '2',
                  children: null,
                },
              ]}
            />
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

export default RoomAdmin
