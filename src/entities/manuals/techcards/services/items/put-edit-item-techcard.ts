import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  techCardId: string
  productId: string
  quantity: number
}

export const putEditItemTechcard = async (props: RequestProps) => {
  const { id, ...rest } = props

  const response = await publicApi.put(`v1/tech-card-item/${id}`, rest)

  if (response.status >= 400) throw new Error()
  return response.data
}
