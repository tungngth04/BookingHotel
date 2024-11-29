import { Button, Input, message, Modal, Pagination, Space, Table, Tabs } from 'antd'
import './SaleAdmin.scss'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { deleteSale, deleteTrashSale, getAllSale, restoreSale } from '../../apis/sale.api'
import CreateSaleModal from '../createSaleModal/createSaleModal'
import { FaTrashRestoreAlt } from 'react-icons/fa'
const SaleAdmin = () => {
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
  const [currentSale, setCurrentSale] = useState(null)
  const [flag, setFlag] = useState(false)

  const fetchSales = async () => {
    setLoading(true)
    try {
      const response = await getAllSale({
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
      title: 'Sale Percent',
      dataIndex: 'salePercent',
      key: 'salePercent',
      width: '100px',
      sorter: (a, b) => a.salePercent - b.salePercent,
    },
    {
      title: 'Day Start',
      dataIndex: 'dayStart',
      key: 'service',
      width: '150px',
    },
    {
      title: 'Day End',
      dataIndex: 'dayEnd',
      key: 'dayEnd',
      width: '150px',
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

  const handleDelete = async (SaleId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: flag
        ? 'Bạn có chắc chắn muốn xóa vĩnh viễn sale này?'
        : 'Bạn có chắc chắn muốn xóa sale này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          if (flag) {
            await deleteTrashSale(SaleId)
          } else {
            await deleteSale(SaleId)
          }
          message.success('Xóa sale thành công')
          setData((prevData) => prevData.filter((item) => item.id !== SaleId))
        } catch (error) {
          console.error('Lỗi xoá sale:', error)
          message.error('Xóa sale thất bại')
        }
      },
    })
  }
  const handleRestore = async (SaleId) => {
    try {
      await restoreSale(SaleId)
      message.success('Khôi phục sale thành công')
      setData((prevData) => prevData.filter((sale) => sale.id !== SaleId))
    } catch (error) {
      console.error('Lỗi khôi phục sale:', error)
      message.error('Khôi phục sale thất bại')
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
    fetchSales()
  }, [pagination, flag])

  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleUpdate = (data) => {
    setIsOpenModel(true)
    setIsUpdate(true)
    setCurrentSale(data)
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý sale</h1>
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
                <CreateSaleModal
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  onSaleCreated={fetchSales}
                  isUpdate={isUpdate}
                  currentSale={currentSale}
                />
              </div>
            </div>
            <Tabs
              defaultActiveKey='1'
              type='card'
              onChange={(key) => setFlag(key == '2')}
              items={[
                {
                  label: <>Sale</>,
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

export default SaleAdmin
