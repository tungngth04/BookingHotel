import { MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Flex } from 'antd'
import Search from 'antd/es/input/Search'
import './HeaderAdmin.scss'
const HeaderAdmin = () => {
  return (
    <>
      <Flex align='center' justify='space-between'>
        <h1 style={{ color: '#89c6ff' }}>Chào mừng trở lại, Tùng</h1>
        <Flex align='center' gap='3rem'>
          <Search placeholder='Tìm kiếm' allowClear />
          <Flex align='center' gap='10px'>
            <MessageOutlined className='header-icon' />
            <NotificationOutlined className='header-icon' />
            <Avatar icon={<UserOutlined />} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default HeaderAdmin
