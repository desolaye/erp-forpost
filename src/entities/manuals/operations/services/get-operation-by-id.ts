import { publicApi } from '@/shared/api/public-api.config'
import { OperationType } from '../model/operation.schema'

export const getOperationById = async (id: string) => {
  const response = await publicApi.get<OperationType>(`v1/operations/${id}`)

  if (response.status >= 400) throw new Error()

  return response.data
}
