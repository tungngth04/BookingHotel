import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const statisticApi = () => ({
  getRevenue: async (params) => apiDefault.get(ApiConstant.statistic.revenue, { params }),
  getRoomBookMonth: async (params) =>
    apiDefault.get(ApiConstant.statistic.roomBookedMonth, { params }),
  getBookingStatus: async (params) =>
    apiDefault.get(ApiConstant.statistic.bookingStatus, { params }),
  getTopBooking: async (params) => apiDefault.get(ApiConstant.statistic.topBooking, { params }),
})

export const { getRevenue, getRoomBookMonth, getBookingStatus, getTopBooking } = statisticApi()
