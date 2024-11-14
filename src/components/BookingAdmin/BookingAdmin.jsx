import { Button, Card, Input, Space, Table } from 'antd'
import './BookingAdmin.scss'
import data from '../../data/mock_data.json'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
const BookingAdmin = () => {
  const columns = [
    {
      title: 'STT',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '80px',
    },
    {
      title: 'Họ',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '150px',
    },
    {
      title: 'Tên',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '150px',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      title: 'Thao tác',
      key: 'action',
      width: '100px',
      render: () => (
        <Space size='middle'>
          <EditOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          {/* <Divider type='vertical' style={{ height: '20px' }} /> */}
          <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Space>
      ),
    },
  ]

  const calculateBodyTableHeight = () => {
    const height =
      window.innerHeight - 90 - 24 * 2 - 20 * 2 - 24 * 2 - 32 - 44 * 2 - 14 * 2 - 19 * 2
    return { y: `${height}px` }
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 3 }}>
        <Card>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý đặt phòng</h1>
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
                pagination={{ locale: { items_per_page: '/ Trang' } }}
                scroll={calculateBodyTableHeight()}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default BookingAdmin
