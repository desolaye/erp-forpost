import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  date: string
}

export const putEditInvoiceClosingDate = async (props: RequestProps) => {
  const { id, date } = props

  const response = await publicApi.put(`v1/invoices/${id}/set-closing-date`, {
    closingDate: date,
  })

  if (response.status >= 400) throw new Error()
  return response
}
