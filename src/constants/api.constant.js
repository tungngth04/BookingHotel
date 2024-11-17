export const ApiConstant = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
  },
  rooms: {
    getAllRoom: '/room',
    createRoom: '/room/create',
    updateRoom: '/room/update/',
    deleteRoom: '/room/delete/',
  },
  users: {
    getAllUser: '/user',
    deleteUser: '/user/delete/',
    editUser: '/user/update/',
    getUserById: '/user/',
    lockById: '/user/lock-unlock/',
    currentUser: '/user/current',
  },
  bookings: {
    getAllBooking: '/booking/admin',
    getBookingById: '/booking/',
    checkInBooking: '/booking/check-in/',
    checkOutBooking: '/booking/check-out/',
    cancelBooking: '/booking/cancel/',
  },
  poducts: {
    getAllProduct: '/product/admin',
    deleteProduct: '/product/delete/',
    editProduct: '/product/update/',
    createProduct: '/product/create',
  },
  sales: {
    getAllSale: '/sale',
    getSaleById: '/sale/',
    deleteSale: '/sale/delete/',
    createSale: '/sale/create',
    editSale: '/sale/update/',
  },
  services: {
    getAllService: '/service/admin',
    createService: '/service/create',
    deleteService: '/service/delete/',
    editService: '/service/update/',
  },
  statistic: {
    topBooking: '/statistic/top-booking',
    roomBookedMonth: '/statistic/room-booked-month',
    revenue: '/statistic/revenue',
    bookingStatus: '/statistic/booking-status',
  },
}
