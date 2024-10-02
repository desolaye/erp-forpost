import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { WarehouseResponseType } from '../../model/warehouse.schema'

export const getWarehousesManual = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<WarehouseResponseType>('v1/storages', {
    params: {
      ...params,
      ...filters,
    },
  })

  return response
}
