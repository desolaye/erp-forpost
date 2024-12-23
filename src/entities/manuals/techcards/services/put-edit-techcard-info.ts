import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  number: string
  description: string
  productId: string
}

export const putEditTechcardInfo = async (props: RequestProps) => {
  const { id, ...rest } = props

  const response = await publicApi.put(`v1/techcards/${id}`, rest)

  if (response.status >= 400) throw new Error()
  return response.data
}
