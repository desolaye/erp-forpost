import { publicApi } from '@/shared/api/public-api.config'

import { InvoiceType } from '../model/invoice.schema'

export const getInvoiceById = async (id: string) => {
  const response = await publicApi.get<InvoiceType>(`v1/invoices/${id}`)

  if (response.status >= 400) throw new Error()
  return response.data
}
