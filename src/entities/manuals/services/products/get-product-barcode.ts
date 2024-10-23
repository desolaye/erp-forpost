import { publicApi } from '@/shared/api/public-api.config'

export const getProductBarcode = async (productId: string) => {
  try {
    const response = await publicApi.get<Blob>(`v1/products/${productId}/barcode`, {
      responseType: 'blob',
    })

    const image = URL.createObjectURL(response.data)

    return image
  } catch (err) {
    console.log(err)
  }

  return ''
}
