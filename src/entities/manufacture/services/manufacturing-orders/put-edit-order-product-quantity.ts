import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  quantity: number
}

export const putEditOrderProductQuantity = async (props: RequestProps) => {
  const { id, quantity } = props

  const response = await publicApi.put(`v1/manufacturing-order-composition/${id}`, {
    quantity,
  })

  if (response.status >= 400) throw new Error()
  return response
}
