import { publicApi } from '@/shared/api/public-api.config'
import { AuthLoginType } from '../model/auth-login.schema'

export const postAuthLogin = async (params: AuthLoginType) => {
  const response = await publicApi.post<string>('v1/accounts/login', params)
  return response
}
