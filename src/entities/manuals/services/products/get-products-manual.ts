import { publicApi } from '@/shared/api/public-api.config'
import { ProductResponseType } from '../../model/product.schema'

type ProductManualProps = {
  skip?: number
  limit?: number
  purchased?: boolean
  categoryName?: string
  categoryId?: string
  name?: string
}

export const getProductsManual = async (props: ProductManualProps) => {
  const { categoryId, categoryName, limit, name, purchased, skip } = props

  const response = await publicApi.get<ProductResponseType>('v1/products', {
    params: {
      Skip: skip,
      Limit: limit,
      CategoryId: categoryId,
      CategoryName: categoryName,
      Name: name,
      Purchased: purchased,
    },
  })

  return response
}
