import { publicApi } from '@/shared/api/public-api.config'

type RequestProps = {
  techCardId: string
  operationId: string
}

export const postAddOperationToTechcard = async (props: RequestProps) => {
  const response = await publicApi.post('v1/tech-card-operation', props)

  if (response.status >= 400) throw new Error()
  return response.data
}
