import { publicApi } from '@/shared/api/public-api.config'

export const putUpdateProductBarcode = async (productId: string, barcode: string) => {
  const response = await publicApi.put('v1/products/barcode', {
    productId,
    barcode,
  })

  return response
}
