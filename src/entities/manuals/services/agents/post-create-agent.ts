import { publicApi } from '@/shared/api/public-api.config'
import { AgentValidatorType } from '../../model/agent.schema'

export const postCreateAgent = async (agent: AgentValidatorType) => {
  const response = await publicApi.post('v1/contractors', {
    name: agent.name,
  })

  return response
}
