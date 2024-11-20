import { publicApi } from '@/shared/api/public-api.config'
import { InvoiceValidatorType } from '../model/invoice.schema'

export const postCreateInvoice = async (invoice: InvoiceValidatorType) => {
  console.log(invoice)

  const response = await publicApi.post('v1/invoices', invoice)

  if (response.status >= 400) throw new Error()
  return response
}
