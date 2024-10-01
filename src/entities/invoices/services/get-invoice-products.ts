import { publicApi } from '@/shared/api/public-api.config'

import { InvoiceProductResponseType } from '../model/invoice.schema'

export const getInvoiceProducts = async (id: string) => {
  const response = await publicApi.get<InvoiceProductResponseType[]>(
    `v1/invoice-products/${id}`,
  )

  return response.data
}
