import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  name: string
  description: string
  operationTypeValue: number
}

export const postCreateOperation = async (props: RequestProps) => {
  const response = await publicApi.post('v1/operations', props)

  if (response.status >= 400) throw new Error()
  return response.data
}
