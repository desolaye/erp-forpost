import { publicApi } from '@/shared/api/public-api.config'

export const postProductScan = async (storageId: string, barcode: string) => {
  const response = await publicApi.post('/v1/storage-products/scan-barcode', {
    storageId,
    barcode,
  })

  return { response, barcode }
}
