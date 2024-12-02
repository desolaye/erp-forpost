import { publicApi } from '@/shared/api/public-api.config'

export const deleteInvoiceById = async (id: string) => {
  const response = await publicApi.delete(`v1/invoices/${id}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
