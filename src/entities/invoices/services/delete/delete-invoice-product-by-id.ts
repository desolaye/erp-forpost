import { publicApi } from '@/shared/api/public-api.config'

export const deleteInvoiceProductById = async (id: string) => {
  const response = await publicApi.delete(`v1/invoice-products/${id}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
