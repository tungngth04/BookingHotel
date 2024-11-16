import { Navigate, useRoutes } from 'react-router-dom'
import './App.scss'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import RoomAdmin from './components/RoomAdmin/RoomAdmin'
import HomeAdmin from './components/HomeAdmin/HomeAdmin'
import Login from './pages/Auth/Login/login'
import BookingAdmin from './components/BookingAdmin/BookingAdmin'
import ServiceAdmin from './components/ServiceAdmin/ServiceAdmin'
import SaleAdmin from './components/SaleAdmin/SaleAdmin'
import ProductAdmin from './components/ProductAdmin/ProductAdmin'
import UserAdmin from './components/UserAdmin/UserAdmin'
// import UserLayout from './layouts/UserLayout/UserLayout'
function App() {
  const router = useRoutes([
    {
      path: '/',
      element: <Navigate to='/login' />,
    },
    {
      path: '/admin',
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
        {
          path: '/admin/bookings',
          element: <BookingAdmin />,
        },
        {
          path: '/admin/services',
          element: <ServiceAdmin />,
        },
        {
          path: '/admin/sales',
          element: <SaleAdmin />,
        },
        {
          path: '/admin/products',
          element: <ProductAdmin />,
        },
        {
          path: '/admin/users',
          element: <UserAdmin />,
        },
      ],
    },
    // {
    //   path: '/',
    //   element: <UserLayout />,
    //   // children: [
    //   //   {
    //   //     path: '',
    //   //     element: <HomeAdmin />,
    //   //   },
    //   //   {
    //   //     path: '/admin/rooms',
    //   //     element: <RoomAdmin />,
    //   //   },
    //   // ],
    // },
    {
      path: '/login',
      element: <Login />,
    },
  ])
  return (
    <>
      {router}
      {/* <Login /> */}
    </>
  )
}

export default App
