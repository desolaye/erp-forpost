import { publicApi } from '@/shared/api/public-api.config'

export const deleteWarehouseById = async (id: string) => {
  const response = await publicApi.delete(`v1/storages/${id}`)
  if (response.status >= 400) throw new Error()
  return response
}
