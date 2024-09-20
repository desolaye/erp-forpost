import { publicApi } from '@/shared/api/public-api.config'
import { ProcessType } from '../../model/processes.schema'

export const getProcessById = async (id: string) => {
  const response = await publicApi.get<ProcessType>(`v1/manufacturingProcesses/${id}`)
  return response.data
}
