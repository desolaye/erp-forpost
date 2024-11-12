import { publicApi } from '@/shared/api/public-api.config'
import { AgentValidatorType } from '../../model/agent.schema'

export const putEditAgent = async (agent: AgentValidatorType, id: string) => {
  const response = await publicApi.put(`v1/contractors/${id}`, {
    ...agent,
  })

  return response
}
