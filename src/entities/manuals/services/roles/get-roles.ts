import { publicApi } from '@/shared/api/public-api.config'
import { RoleType } from '../../model/role.schema'

export const getRoles = async () => {
  const response = await publicApi.get<RoleType[]>('v1/role')
  return response
}
