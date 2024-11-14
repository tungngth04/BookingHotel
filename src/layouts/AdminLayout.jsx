import { useState } from 'react'
import './AdminLayout.scss'
import { Button, Flex, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin'
import HeaderAdmin from '../common/HeaderAdmin/HeaderAdmin'
import SideAdmin from '../components/SideAdmin/SideAdmin'
import { Outlet } from 'react-router-dom'
const { Header, Sider, Content } = Layout
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='admin'>
      <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
          <SideBarAdmin />
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='trigger-btn'
          />
        </Sider>
        <Layout>
          <Header className='header'>
            <HeaderAdmin />
          </Header>
          <Content className='content'>
            <Flex gap='large'>
              <Outlet />
              <SideAdmin />
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AdminLayout
