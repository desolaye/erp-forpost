import { publicApi } from '@/shared/api/public-api.config'

import {
  InvoiceHistoryResponseType,
  ZInvoiceHistoryResponse,
} from '../model/invoice.schema'

export const getInvoiceHistoryById = async (id: string) => {
  const response = await publicApi.get<InvoiceHistoryResponseType>(
    `v1/invoices/${id}/change-logs`,
  )

  if (response.status >= 400) throw new Error()

  const parsed = ZInvoiceHistoryResponse.parse(response.data)

  return parsed.items
}
