import { publicApi } from '@/shared/api/public-api.config'

export const deleteFileById = async (id: string) => {
  const response = await publicApi.delete(`v1/files/${id}`)
  return response.data
}
