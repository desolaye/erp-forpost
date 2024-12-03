import { publicApi } from '@/shared/api/public-api.config'

export const deleteOrderProduct = async (id: string) => {
  const response = await publicApi.delete(`v1/manufacturing-order-composition/${id}`)

  if (response.status >= 400) throw new Error()
  return response
}
