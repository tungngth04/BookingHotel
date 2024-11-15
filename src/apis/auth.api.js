import { apiDefault } from '.'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ emailOrPhone, password }) =>
    apiDefault.post(ApiConstant.auth.login, { emailOrPhone, password }),
})
export const { login } = authApi()
