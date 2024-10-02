import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { InvoiceResponseType, ZInvoiceResponse } from '../model/invoice.schema'

export const getInvoicesAll = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<InvoiceResponseType>('v1/invoices', {
    params: {
      ...params,
      ...filters,
    },
  })

  const parsed = ZInvoiceResponse.safeParse(response.data)

  if (parsed.error) console.log(parsed.error)

  return parsed.data
}
