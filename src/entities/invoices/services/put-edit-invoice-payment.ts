import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  payment: number
}

export const putEditInvoicePayment = async (props: RequestProps) => {
  const { id, payment } = props

  const response = await publicApi.put(`v1/invoices/${id}/payment-status`, {
    paymentStatusValue: payment,
  })

  if (response.status >= 400) throw new Error()
  return response
}
