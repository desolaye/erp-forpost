import { publicApi } from '@/shared/api/public-api.config'
import { WarehouseType } from '../../model/warehouse.schema'

export const getWarehousesManual = async () => {
  const response = await publicApi.get<WarehouseType[]>('v1/storages')
  return response
}
