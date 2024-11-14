import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const serviceApi = () => ({
  getAllService: async () => apiDefault.get(ApiConstant.services.getAllService),
})

export const { getAllRoom } = serviceApi()
