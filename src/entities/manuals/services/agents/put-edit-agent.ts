import { publicApi } from '@/shared/api/public-api.config'
import { AgentValidatorType } from '../../model/agent.schema'

export const putEditAgent = async (agent: AgentValidatorType, id: string) => {
  const response = await publicApi.put(`v1/contractors/${id}`, {
    ...agent,
    contractType: agent.contractType.value,
    country: agent.country.value,
  })

  if (response.status > 400) throw new Error()
  return response
}
