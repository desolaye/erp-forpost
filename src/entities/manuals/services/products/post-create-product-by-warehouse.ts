import { publicApi } from '@/shared/api/public-api.config'
import { ProductByWarehouseToBackType } from '../../model/product.schema'

export const postCreateProductByWarehouse = async (
  storageId: string,
  product: ProductByWarehouseToBackType,
) => {
  const response = await publicApi.post('v1/storage-products', { storageId, ...product })
  return response
}
