import { CaretUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import './ScrollTop.scss'
const ScrollTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {showScrollTop && (
        <div className='scrollTop' onClick={scrollTop}>
          <CaretUpOutlined />
        </div>
      )}
    </>
  )
}

export default ScrollTop
