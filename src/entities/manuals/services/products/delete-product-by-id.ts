import { publicApi } from '@/shared/api/public-api.config'

export const deleteProductByid = async (id: string) => {
  const response = await publicApi.delete(`v1/products/${id}`)
  return response
}
