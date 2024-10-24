import { publicApi } from '@/shared/api/public-api.config'

interface IPostReq {
  storageId: string
  productId: { Id: string; Name: string }
  barcode: string
  quantity: string
}

export const postProductScan = async (props: IPostReq) => {
  const { barcode, productId, quantity, storageId } = props

  const response = await publicApi.post('/v1/storage-products/scan-barcode', {
    storageId,
    productId: productId.Id,
    barcode,
    quantity: Number(quantity),
  })

  return { response, barcode, productName: productId.Name, quantity }
}
