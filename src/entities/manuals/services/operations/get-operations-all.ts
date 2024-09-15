import { publicApi } from '@/shared/api/public-api.config'
import { OperationType } from '../../model/operation.schema'

export const getOperationsAll = async () => {
  const response = await publicApi.get<OperationType[]>('v1/operations')
  return response
}
