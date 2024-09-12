import { publicApi } from '@/shared/api/public-api.config'
import { ProductResponseType } from '../../model/product.schema'

interface IGetProductsManual {
  params: {
    skip: number
    limit: number
  }
}

export const getProductsManual = async (props: IGetProductsManual) => {
  const { params } = props

  const response = await publicApi.get<ProductResponseType>('v1/products', { params })
  return response
}
