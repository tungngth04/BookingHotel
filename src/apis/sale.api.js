import { api, apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const saleApi = () => ({
  getAllSale: async (params) => apiDefault.get(ApiConstant.sales.getAllSale, { params }),
  deleteSale: async (id) => api.delete(`${ApiConstant.sales.deleteSale}${id}`),
  createSale: async (data) => apiDefault.post(ApiConstant.sales.createSale, data),
  updateSale: async (id, data) => apiDefault.put(`${ApiConstant.sales.editSale}${id}`, data),
})

export const { getAllSale, deleteSale, createSale, updateSale } = saleApi()
