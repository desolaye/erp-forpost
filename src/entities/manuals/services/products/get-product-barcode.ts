import { publicApi } from '@/shared/api/public-api.config'

export const getProductBarcode = async (productId: string) => {
  try {
    const response = await publicApi.get<{ contentType: string; fileContents: string }[]>(
      `v1/products/${productId}/barcode`,
    )

    const imageURIs = response.data.map(
      (v) => `data:${v.contentType};base64,${v.fileContents}`,
    )

    return imageURIs
  } catch (err) {
    console.log(err)
  }

  return []
}
