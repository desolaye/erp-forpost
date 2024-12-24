import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  id: string
  name: string
  description: string
  operationTypeValue: number
}

export const putEditOperation = async (props: RequestProps) => {
  const { id, ...rest } = props

  const response = await publicApi.put(`v1/operations/${id}`, rest)

  if (response.status >= 400) throw new Error()
  return response.data
}
