import { useRoutes } from 'react-router-dom'
import './App.scss'
import AdminLayout from './layouts/AdminLayout'
import RoomAdmin from './components/RoomAdmin/RoomAdmin'
import HomeAdmin from './components/HomeAdmin/HomeAdmin'
function App() {
  const router = useRoutes([
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        {
          path: '',
          element: <HomeAdmin />,
        },
        {
          path: '/admin/rooms',
          element: <RoomAdmin />,
        },
      ],
    },
  ])
  return <>{router}</>
}

export default App
