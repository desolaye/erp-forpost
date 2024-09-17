import { publicApi } from '@/shared/api/public-api.config'

type UUIDType = string

export const postCreateOperation = async (name: string) => {
  const response = await publicApi.post<UUIDType>('v1/operations', { name })
  return response
}
