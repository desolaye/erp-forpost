import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  priority: number
}

export const putEditInvoicePriority = async (props: RequestProps) => {
  const { id, priority } = props

  const response = await publicApi.put(`v1/invoices/${id}/priority`, {
    priorityValue: priority,
  })

  if (response.status >= 400) throw new Error()
  return response
}
