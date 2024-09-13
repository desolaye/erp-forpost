import { publicApi } from '@/shared/api/public-api.config'
import { RoleType } from '../../model/role.schema'

export const getRoleById = async (id: string) => {
  const response = await publicApi.get<RoleType>(`v1/role/${id}`)
  return response
}
