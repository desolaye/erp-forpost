import { publicApi } from '@/shared/api/public-api.config'
import { WarehouseValidatorType } from '../../model/warehouse.schema'

export const postCreateWarehouse = async (warehouse: WarehouseValidatorType) => {
  const response = await publicApi.post('v1/storages', {
    ...warehouse,
    responsibleId: '15492e30-8df3-132f-9de6-3fcd91e38923',
  })
  return response
}
