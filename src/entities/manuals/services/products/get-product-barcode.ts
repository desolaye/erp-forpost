import { publicApi } from '@/shared/api/public-api.config'

export const getProductBarcode = async (productId: string) => {
  try {
    const response = await publicApi.get<Blob>(`v1/products/${productId}/barcode`, {
      responseType: 'blob',
    })

    return URL.createObjectURL(response.data)
  } catch (err) {
    console.log(err)
  }

  return ''
}