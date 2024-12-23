import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  techCardId: string
  productId: string
  quantity: number
}

export const postAddItemToTechcard = async (props: RequestProps) => {
  const response = await publicApi.post('v1/tech-card-item', props)

  if (response.status >= 400) throw new Error()
  return response.data
}
