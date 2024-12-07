import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const userApi = () => ({
  getAllUser: async (params) => apiDefault.get(ApiConstant.users.getAllUser, { params }),
  deleteUser: async (id) => api.delete(`${ApiConstant.users.deleteUser}${id}`),
  updateUser: async (id, data) =>
    apiDefaultUpload.patch(`${ApiConstant.users.editUser}${id}`, data),
  lockUser: async (id, data) =>
    apiDefault.post(`${ApiConstant.users.lockById}${id}?isLocked=${data.isLocked}`),
  getCurrentUser: async () => apiDefault.get(ApiConstant.users.currentUser),
  getUserById: async (id) => apiDefault.get(`${ApiConstant.users.getUserById}${id}`),
})

export const { getAllUser, deleteUser, updateUser, lockUser, getCurrentUser, getUserById } =
  userApi()
