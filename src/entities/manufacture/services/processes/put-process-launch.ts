import { publicApi } from '@/shared/api/public-api.config'

export const putProcessLaunch = async (id: string) => {
  const response = await publicApi.put(`v1/manufacturingProcesses/${id}/launch`)
  return response
}
