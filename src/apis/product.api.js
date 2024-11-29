import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const productApi = () => ({
  getAllProduct: async (params) => apiDefault.get(ApiConstant.poducts.getAllProduct, { params }),
  deleteProduct: async (id) => api.delete(`${ApiConstant.poducts.deleteProduct}${id}`),
  createProduct: async (data) => apiDefaultUpload.post(ApiConstant.poducts.createProduct, data),
  updateProduct: async (id, data) =>
    apiDefaultUpload.patch(`${ApiConstant.poducts.editProduct}${id}`, data),
  restoreProduct: async (id) => apiDefault.post(`${ApiConstant.poducts.restoreProduct}${id}`),
  deleteTrashProduct: async (id) => api.delete(`${ApiConstant.poducts.deleteTrashProduct}${id}`),
})

export const {
  getAllProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  restoreProduct,
  deleteTrashProduct,
} = productApi()
