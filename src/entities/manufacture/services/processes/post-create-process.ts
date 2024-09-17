import { publicApi } from '@/shared/api/public-api.config'
import { ProcessValidatorType } from '../../model/processes.schema'

export const postCreateProcess = async (process: ProcessValidatorType) => {
  type UUIDType = string

  const response = await publicApi.post<UUIDType>('v1/manufacturingProcesses', process)
  return response
}
