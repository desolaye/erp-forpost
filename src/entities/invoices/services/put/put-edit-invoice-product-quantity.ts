import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  quantity: number
}

export const putEditInvoiceProductQuantity = async (props: RequestProps) => {
  const { id, quantity } = props

  const response = await publicApi.put(`v1/invoice-products/${id}/change-quantity`, {
    quantity,
  })

  if (response.status >= 400) throw new Error()
  return response
}
