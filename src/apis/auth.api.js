import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ emailOrPhone, password }) =>
    apiDefault.post(ApiConstant.auth.login, { emailOrPhone, password }),
  logout: async () => apiDefault.post(ApiConstant.auth.logout),
})
export const { login, logout } = authApi()
