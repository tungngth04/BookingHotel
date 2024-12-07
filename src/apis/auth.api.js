import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ emailOrPhone, password }) =>
    apiDefault.post(ApiConstant.auth.login, { emailOrPhone, password }),
  logout: async () => apiDefault.post(ApiConstant.auth.logout),
  register: async (data) => apiDefaultUpload.post(ApiConstant.auth.signup, data),

  verify: async ({ email, token }) =>
    api.post(`${ApiConstant.auth.verify}?email=${email}&token=${token}`),
})
export const { login, logout, register, verify } = authApi()
