import { publicApi } from '@/shared/api/public-api.config'
import { ProductByWarehouseResponseType } from '../../model/product.schema'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

export const getProductsByWarehouse = async (id: string, props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<ProductByWarehouseResponseType>(
    `v1/storage-products/${id}`,
    {
      params: {
        ...params,
        ...filters,
      },
    },
  )

  return response
}
