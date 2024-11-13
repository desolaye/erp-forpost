import { publicApi } from '@/shared/api/public-api.config'

export const deleteStaffById = async (id: string) => {
  const response = await publicApi.delete(`v1/employees/${id}`)
  if (response.status >= 400) throw new Error()
  return response
}
