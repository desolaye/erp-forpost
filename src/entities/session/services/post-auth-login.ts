import { AuthLoginType } from '../model/auth-login.schema'

export const postAuthLogin = async (params: AuthLoginType) => {
  const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL

  const response = await fetch(ENV_URL + '/v1/accounts/login', {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const token = await response.json()
  return token
}
