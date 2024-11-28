import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  percent: number
}

export const putEditInvoicePercents = async (props: RequestProps) => {
  const { id, percent } = props

  const response = await publicApi.put(`v1/invoices/${id}/payment-percentage`, {
    paymentPercentage: percent,
  })

  if (response.status >= 400) throw new Error()
  return response
}
