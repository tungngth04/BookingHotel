import { api, apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const roomApi = () => ({
  getAllRoom: async (params) => apiDefault.get(ApiConstant.rooms.getAllRoom, { params }),
  deleteRoom: async (id) => api.delete(`${ApiConstant.rooms.deleteRoom}${id}`),
})

export const { getAllRoom, deleteRoom } = roomApi()
