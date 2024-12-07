import toast from 'react-hot-toast'
import { getAllRoomAvailable } from '../../apis/room.api'
import './ListRooms.scss'
import ImgRoom from '../../assets/images/rooms.jpg'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import ScrollTop from '../../components/ScrollTop/ScrollTop'
import { useNavigate } from 'react-router-dom'
const ListRooms = () => {
  const [rooms, setRooms] = useState([])
  const CURRENT_DEFAULT = 1
  const PAGE_SIZE_DEFAULT = 8
  const [totalRooms, setTotalRooms] = useState(0)
  const [pagination, setPagination] = useState({
    current: CURRENT_DEFAULT,
    size: PAGE_SIZE_DEFAULT,
  })
  const navigate = useNavigate()
  const loadRooms = async () => {
    try {
      const data = await getAllRoomAvailable({
        pageNum: pagination.current,
        pageSize: pagination.size,
      })
      setRooms(data.data.data.items)
      setTotalRooms(data.data.data.meta.totalElements)
    } catch (error) {
      toast.error('Load Rooms Lỗi')
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
    loadRooms()
  }, [pagination])

  return (
    <>
      <div className='rooms-header'>
        <h2 className='rooms-header__title'>Our Rooms</h2>
        <p className='rooms-header__subtitle'>Choose from our comfortable and luxurious rooms</p>
      </div>
      <div className='box-rooms'>
        <div className='list-rooms'>
          {rooms.map((room, idx) => (
            <div key={idx} className='room-card'>
              <div className='room-img'>
                <img src={ImgRoom} alt='Room picture' />
              </div>
              <div className='room-info'>
                <h3>{room.name}</h3>
                <p className='room-price'>{room.price} VND</p>
                <table className='room-table'>
                  <tr>
                    <td className='room-label'>Type</td>
                    <td className='room-value value1'>{room.type}</td>
                  </tr>
                  <tr>
                    <td className='room-label'>Capacity</td>
                    <td className='room-value'>{room.capacity}</td>
                  </tr>
                  <tr>
                    <td className='room-label'>Bed</td>
                    <td className='room-value'>{room.bed}</td>
                  </tr>
                  <tr>
                    <td className='room-label'>Size</td>
                    <td className='room-value'>{room.size}</td>
                  </tr>
                </table>
                <button className='room-btn' onClick={() => navigate(`/detail-room/${room.id}`)}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='pagination-wrapper'>
        <Pagination
          current={pagination.current}
          pageSize={pagination.size}
          showSizeChanger
          onChange={handleChange}
          onShowSizeChange={handleChange}
          total={totalRooms}
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
      <ScrollTop />
    </>
  )
}

export default ListRooms
