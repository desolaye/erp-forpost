import { publicApi } from '@/shared/api/public-api.config'
import { InvoiceValidatorType } from '../model/invoice.schema'

export const postCreateInvoice = async (data: InvoiceValidatorType) => {
  const response = await publicApi.post('v1/invoices', {
    ...data,
  })

  return response
}
