import { publicApi } from '@/shared/api/public-api.config'

import { InvoiceResponseType, ZInvoiceResponse } from '../../model/invoice.schema'

type InvoicesAllParams = {
  number?: string
  contractorId?: string
  dateShipment?: string
  dateClosing?: string
  priority?: number
  paymentStatus?: number
  invoiceStatus?: number
  skip?: number
  limit?: number
}

export const getInvoicesAll = async (props: InvoicesAllParams) => {
  const {
    contractorId,
    dateClosing,
    dateShipment,
    invoiceStatus,
    limit,
    number,
    paymentStatus,
    priority,
    skip,
  } = props

  const response = await publicApi.get<InvoiceResponseType>('v1/invoices', {
    params: {
      Skip: skip,
      Limit: limit,
      ContractorId: contractorId,
      DateClosing: dateClosing,
      DateShipment: dateShipment,
      InvoiceStatus: invoiceStatus,
      Number: number,
      PaymentStatus: paymentStatus,
      Priority: priority,
    },
  })

  const parsed = ZInvoiceResponse.safeParse(response.data)

  if (parsed.error || response.status >= 400) {
    console.log(parsed.error)
    throw new Error()
  }

  return parsed.data
}
