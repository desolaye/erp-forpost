import { publicApi } from '@/shared/api/public-api.config'
import { AgentValidatorType } from '../../model/agent.schema'

export const postCreateAgent = async (agent: AgentValidatorType) => {
  const response = await publicApi.post('v1/contractors', {
    ...agent,
    contractType: agent.contractType.value,
    country: agent.country.value,
  })

  if (response.status > 400) throw new Error()
  return response
}
