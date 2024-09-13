import { publicApi } from '@/shared/api/public-api.config'
import { WarehouseValidatorType } from '../../model/warehouse.schema'

export const postCreateWarehouse = async (warehouse: WarehouseValidatorType) => {
  const response = await publicApi.post('v1/storages', {
    name: warehouse.name,
    responsibleId: warehouse.responsibleId.value,
  })
  return response
}
