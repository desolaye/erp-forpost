import { publicApi } from '@/shared/api/public-api.config'

export const putProcessComplete = async (id: string) => {
  const response = await publicApi.put(`v1/manufacturingProcesses/${id}/complete`)
  return response
}
