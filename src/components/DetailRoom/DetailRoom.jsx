import { useEffect, useRef, useState } from 'react'
import './DetailRoom.scss'
import { getRoomById } from '../../apis/room.api'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import ImgRoom from '../../assets/images/rooms.jpg'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { Button } from 'antd'

const DetailRoom = () => {
  const [room, setRoom] = useState([])
  const param = useParams()
  const loadRoom = async () => {
    try {
      const data = await getRoomById(param.id)
      setRoom(data.data.data)
    } catch (error) {
      toast.error('Load Rooms Lỗi')
    }
  }
  useEffect(() => {
    loadRoom()
  }, [])
  const containerRef = useRef(null)

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }
  return (
    <>
      <div className='box-detail'>
        <h1>Chi tiết phòng</h1>
        <div className='room-detail'>
          <div className='room-detail__content'>
            <div className='room-detail__img'>
              <img src={ImgRoom} alt='Picture Room' />
            </div>
            <div className='room-detail__infor'>
              <div className='room-detail__header'>
                <h1>{room.name}</h1>
                <div className='room-detail__header-left'>
                <div className='room-detail__rating'>
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className='star filled' size={20} style={{ color: 'yellow' }} />
                  ))}
                  <FaStarHalf className='star half' size={20} style={{ color: 'yellow' }} />
                </div>
                <div className='room-detail__booking'>
                  <Button>BOOKING</Button>
                </div>
                </div>
                
              </div>
              <div className='room-detail__price'>
                <span className='amount'>{room.price} VND</span>
                <span className='per-night'>/Per night</span>
              </div>
              <div className='room-detail__table'>
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
              </div>
              <div className='room-detail__description'>
                <p>{room.description}</p>
              </div>
              <div className='room-detail__services'>
                <p>
                  <strong>Các dịch vụ đi kèm: </strong>
                  {room.services}
                </p>
              </div>
              <div className='room-detail__medias'>
                <button className='left-arrow' onClick={scrollLeft}>
                  &lt;
                </button>
                <div className='room-medias-container' ref={containerRef}>
                  {room.medias?.map((media, index) => (
                    <img key={index} src={media.url} alt='Picture Room' />
                  ))}
                </div>
                <button className='right-arrow' onClick={scrollRight}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div className='room-detail__reservation'>
            <div className='reservation-form'>
              <h2 className='reservation-form__title'>Your Reservation</h2>
              <form>
                <div className='form-group'>
                  <label>Check In:</label>
                  <div className='input-wrapper'>
                    <input
                      type='date'
                      //   value={checkIn}
                      //   onChange={(e) => setCheckIn(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Check Out:</label>
                  <div className='input-wrapper'>
                    <input
                      type='date'
                      //   value={checkOut}
                      //   onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Guests:</label>
                  <div className='input-wrapper'>
                    <select
                    //   value={guests}
                    //   onChange={(e) => setGuests(e.target.value)}
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type='submit' className='check-availability-btn'>
                  CHECK AVAILABILITY
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailRoom
