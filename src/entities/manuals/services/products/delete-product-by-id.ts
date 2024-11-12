import { publicApi } from '@/shared/api/public-api.config'

export const deleteProductById = async (id: string) => {
  const response = await publicApi.delete(`v1/products/${id}`)
  return response
}
