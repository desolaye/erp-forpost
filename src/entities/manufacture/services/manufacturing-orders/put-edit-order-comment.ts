import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  comment: string
}

export const putEditOrderComment = async (props: RequestProps) => {
  const { id, comment } = props

  const response = await publicApi.put(`v1/manufacturing-order/${id}`, {
    comment,
  })

  if (response.status >= 400) throw new Error()
  return response
}
