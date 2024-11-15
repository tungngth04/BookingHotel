import { Button, Input, message, Modal, Pagination, Space, Table } from 'antd'
import './ProductAdmin.scss'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'

import { deleteProduct, getAllProduct } from '../../apis/product.api'
import CreateProductModal from '../createProductModal/createProductModal'
const ProductAdmin = () => {
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
  const [currentProduct, setCurrentProduct] = useState(null)
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getAllProduct({
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
        <img src={thumbnail} alt='product thumbnail' style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      width: '150px',
      render: (service) => service?.title || 'N/A',
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

  const handleDelete = async (productId) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await deleteProduct(productId)
          message.success('Xóa sản phẩm thành công')
          setData((prevData) => prevData.filter((item) => item.id !== productId))
        } catch (error) {
          console.error('Error deleting product:', error)
          message.error('Xóa sản phẩm thất bại')
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
    fetchProducts()
  }, [pagination])

  const handleCancel = () => {
    setIsOpenModel(false)
  }
  const handleUpdate = (data) => {
    setIsOpenModel(true)
    setIsUpdate(true)
    setCurrentProduct(data)
  }
  return (
    <>
      <div className='home-admin' style={{ flex: 1 }}>
        <div className='box-content'>
          <div className='content-home-admin'>
            <div className='title'>
              <h1>Danh sách quản lý sản phẩm</h1>
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
                <CreateProductModal
                  onCancel={handleCancel}
                  visible={isOpenModel}
                  onProductCreated={fetchProducts}
                  isUpdate={isUpdate}
                  currentProduct={currentProduct}
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

export default ProductAdmin
