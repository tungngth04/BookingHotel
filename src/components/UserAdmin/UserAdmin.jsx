import { Button, Input, message, Modal, Pagination, Space, Table } from 'antd'
import './UserAdmin.scss'
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import CreateUserModal from '../createUserModal/createUserModal'
import { deleteUser, getAllUser, lockUser } from '../../apis/user.api'
const UserAdmin = () => {
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
  const [currentUser, setCurrentUser] = useState(null)
  const [isLock, setIsLock] = useState(false)
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await getAllUser({
        isLocked: isLock,
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
      width: '150px',
    },
    {
      title: 'Picture',
      key: 'avatar',
      dataIndex: 'avatar',
      width: '100px',
      render: (avatar) => (
        <img src={avatar} alt='avatar' style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '150px',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '150px',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '200px',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '150px',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '120px',

      filters: [
        {
          text: 'Nam',
          value: 'Male',
        },
        {
          text: 'Nữ',
          value: 'Female',
        },
      ],
      onFilter: (value, record) => record.gender.endsWith(String(value)),
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      width: '150px',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '100px',
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      width: '120px',
    },

    {
      title: 'Action',
      key: 'action',
      width: '100px',
      fixed: 'right',
      render: (record) => (
        <Space size='middle'>
          <EditOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() => handleUpdate(record)}
          />
          {isLock ? (
            <DeleteOutlined
              style={{ fontSize: '20px', cursor: 'pointer', color: 'red' }}
              onClick={() => handleDelete(record.id)}
            />
          ) : null}

          {isLock ? (
            <LockOutlined
              style={{ fontSize: '20px', cursor: 'pointer', color: '#ff4d4f' }}
              onClick={() => handleToggleLock(record.id, false)}
            />
          ) : (
            <UnlockOutlined
              style={{ fontSize: '20px', cursor: 'pointer', color: '#52c41a' }}
              onClick={() => handleToggleLock(record.id, true)}
            />
          )}
        </Space>
      ),
    },
  ]
  const calculateBodyTableHeight = () => {
    const height =
      window.innerHeight - 90 - 24 * 2 - 20 * 2 - 24 * 2 - 32 - 44 * 2 - 14 * 2 - 19 * 2
    return { y: `${height}px` }
  }
  const handleDelete = async (UserId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteUser(UserId)
          message.success('Xóa người dùng thành công')
          setData((prevData) => prevData.filter((user) => user.id !== UserId))
        } catch (error) {
          console.error('Error deleting User:', error)
          message.error('Xóa người dùng thất bại')
        }
      },
    })
  }
  const handleToggleLock = async (userId, isLock) => {
    try {
      setLoading(true)
      await lockUser(userId, { isLocked: isLock })
      message.success(isLock ? 'Người dùng đã bị khóa' : 'Người dùng đã được mở khóa')
      if (isLock) {
        setData((prevData) => prevData.filter((user) => user.id !== userId))
      } else {
        setData((prevData) => prevData.filter((user) => user.id !== userId))
      }
    } catch (error) {
      console.error('Error toggling lock status:', error)
      message.error('Thay đổi trạng thái khóa thất bại')
    } finally {
      setLoading(false)
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
    fetchUsers()
  }, [pagination, isLock])

  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleUpdate = (data) => {
    setIsOpenModel(true)
    setCurrentUser(data)
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản khách hàng</h1>
              <div className='search-bar'>
                <Input.Search
                  className='search-input'
                  placeholder='Tìm kiếm thành viên'
                  allowClear
                />
                <Button onClick={() => setIsLock(false)} style={{ backgroundColor: 'green' }}>
                  <UnlockOutlined /> Mở khoá
                </Button>
                <Button onClick={() => setIsLock(true)} style={{ backgroundColor: 'red' }}>
                  <LockOutlined /> Khoá
                </Button>

                <CreateUserModal
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  onUserCreated={fetchUsers}
                  currentUser={currentUser}
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

export default UserAdmin
