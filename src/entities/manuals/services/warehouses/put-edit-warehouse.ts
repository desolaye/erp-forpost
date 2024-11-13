import { publicApi } from '@/shared/api/public-api.config'
import { WarehouseValidatorType } from '../../model/warehouse.schema'

export const putEditWarehouse = async (warehouse: WarehouseValidatorType) => {
  const response = await publicApi.put(`v1/storages/${warehouse.id}`, warehouse)
  if (response.status >= 400) throw new Error()

  return response
}
