import { publicApi } from '@/shared/api/public-api.config'
import { ProductResponseType } from '../../model/product.schema'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

export const getProductsManual = async (props: GetWithParamsType) => {
  const { params } = props

  const response = await publicApi.get<ProductResponseType>('v1/products', { params })
  return response
}
