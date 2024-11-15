import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const roomApi = () => ({
  getAllRoom: async (params) => apiDefault.get(ApiConstant.rooms.getAllRoom, { params }),
  deleteRoom: async (id) => api.delete(`${ApiConstant.rooms.deleteRoom}${id}`),
  createRoom: async (data) => apiDefaultUpload.post(ApiConstant.rooms.createRoom, data),
  updateRoom: async (id, data) =>
    apiDefaultUpload.put(`${ApiConstant.rooms.updateRoom}${id}`, data),
})

export const { getAllRoom, deleteRoom, createRoom, updateRoom } = roomApi()
