import { publicApi } from '@/shared/api/public-api.config'
import { OperationType } from '../model/operation.schema'

export const deleteOperationById = async (id: string) => {
  const response = await publicApi.delete<OperationType>(`v1/operations/${id}`)

  if (response.status >= 400) throw new Error()

  return response.data
}
