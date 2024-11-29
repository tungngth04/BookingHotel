import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const serviceApi = () => ({
  getAllService: async (params) => apiDefault.get(ApiConstant.services.getAllService, { params }),
  deleteService: async (id) => api.delete(`${ApiConstant.services.deleteService}${id}`),
  createService: async (data) => apiDefaultUpload.post(ApiConstant.services.createService, data),
  updateService: async (id, data) =>
    apiDefaultUpload.put(`${ApiConstant.services.editService}${id}`, data),
  restoreService: async (id) => apiDefault.post(`${ApiConstant.services.restoreService}${id}`),
  deleteTrashService: async (id) => api.delete(`${ApiConstant.services.deleteTrashService}${id}`),
})

export const {
  getAllService,
  deleteService,
  createService,
  updateService,
  restoreService,
  deleteTrashService,
} = serviceApi()
