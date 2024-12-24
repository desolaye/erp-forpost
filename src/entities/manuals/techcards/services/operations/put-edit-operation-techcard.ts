import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  techCardId: string
  operationId: string
  number: number
}

export const putEditOperationTechcard = async (props: RequestProps) => {
  const { id, ...rest } = props

  const response = await publicApi.put(`v1/tech-card-operation/${id}`, rest)

  if (response.status >= 400) throw new Error()
  return response.data
}
