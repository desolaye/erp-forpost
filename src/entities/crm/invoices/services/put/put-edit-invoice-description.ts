import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  description: string
}

export const putEditInvoiceDescription = async (props: RequestProps) => {
  const { id, description } = props

  const response = await publicApi.put(`v1/invoices/${id}/change-description`, {
    description,
  })

  if (response.status >= 400) throw new Error()
  return response
}
