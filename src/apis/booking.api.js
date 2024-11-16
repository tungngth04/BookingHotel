import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const bookingApi = () => ({
  getAllBooking: async (params) => apiDefault.get(ApiConstant.bookings.getAllBooking, { params }),
  cancelBooking: async (id, data) =>
    apiDefault.post(`${ApiConstant.bookings.cancelBooking}${id}?note=${data.note}`),
  checkInBooking: async (id) => apiDefault.post(`${ApiConstant.bookings.checkInBooking}${id}`),
  checkOutBooking: async (id) => apiDefault.post(`${ApiConstant.bookings.checkOutBooking}${id}`),
  getBookingById: async (id) => apiDefault.get(`${ApiConstant.bookings.getBookingById}${id}`),
})

export const { getAllBooking, cancelBooking, checkInBooking, checkOutBooking, getBookingById } =
  bookingApi()
