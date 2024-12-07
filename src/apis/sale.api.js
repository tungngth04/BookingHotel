import { api, apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const saleApi = () => ({
  getAllSale: async (params) => apiDefault.get(ApiConstant.sales.getAllSale, { params }),
  deleteSale: async (id) => api.delete(`${ApiConstant.sales.deleteSale}${id}`),
  createSale: async (data) => apiDefault.post(ApiConstant.sales.createSale, data),
  updateSale: async (id, data) => apiDefault.put(`${ApiConstant.sales.editSale}${id}`, data),
  restoreSale: async (id) => apiDefault.post(`${ApiConstant.sales.restoreSale}${id}`),
  deleteTrashSale: async (id) => api.delete(`${ApiConstant.sales.deleteTrashSale}${id}`),
  getSaleById: async (id) => apiDefault.get(`${ApiConstant.sales.getSaleById}${id}`),
})

export const {
  getAllSale,
  deleteSale,
  createSale,
  updateSale,
  restoreSale,
  deleteTrashSale,
  getSaleById,
} = saleApi()
