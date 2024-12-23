import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  number: string
  description: string
  productId: string
}

export const postCreateTechcard = async (props: RequestProps) => {
  const response = await publicApi.post('v1/techcards/', props)

  if (response.status >= 400) throw new Error()
  return response.data
}
