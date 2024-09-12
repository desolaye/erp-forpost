import { publicApi } from '@/shared/api/public-api.config'
import { WarehouseResponseType } from '../../model/warehouse.schema'

interface IGetWarehouseManual {
  params: {
    skip: number
    limit: number
  }
}

export const getWarehousesManual = async (props: IGetWarehouseManual) => {
  const { params } = props

  const response = await publicApi.get<WarehouseResponseType>('v1/storages', { params })
  return response
}
