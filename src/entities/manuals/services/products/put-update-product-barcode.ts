import { publicApi } from '@/shared/api/public-api.config'

export const putUpdateProductBarcode = async (
  productId: string,
  barcode: string,
  quantity: string,
) => {
  const response = await publicApi.post('v1/products/barcode', {
    productId,
    barcode,
    quantity,
  })

  return response
}
