import { Button, Input, message, Modal, Pagination, Space, Table } from 'antd'
import './ServiceAdmin.scss'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteService, getAllService } from '../../apis/service.api'
import CreateServiceModal from '../createServiceModal/createServiceModal'

const ServiceAdmin = () => {
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
  const [currentService, setCurrentService] = useState(null)
  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await getAllService({
        deleteFlag: false,
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
      title: 'Picture',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      width: '100px',
      render: (thumbnail) => (
        <img src={thumbnail} alt='service thumbnail' style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '150px',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '100px',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '150px',
      render: (createdBy) => createdBy?.firstName || 'N/A',
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
  const handleDelete = async (ServiceId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteService(ServiceId)
          message.success('Xóa dịch vụ thành công')
          setData((prevData) => prevData.filter((service) => service.id !== ServiceId))
        } catch (error) {
          console.error('Error deleting Service:', error)
          message.error('Xóa dịch vụ thất bại')
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
    fetchServices()
  }, [pagination])

  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleUpdate = (data) => {
    setIsOpenModel(true)
    setIsUpdate(true)
    setCurrentService(data)
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý dịch vụ</h1>
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
                <CreateServiceModal
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  onServiceCreated={fetchServices}
                  isUpdate={isUpdate}
                  currentService={currentService}
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

export default ServiceAdmin
