import { publicApi } from '@/shared/api/public-api.config'
import { AgentRepresentativesValidatorType } from '../../model/agent.schema'

export const postAddRepresentativesAgent = async (
  represent: AgentRepresentativesValidatorType,
) => {
  const response = await publicApi.post('v1/contractors/contractor-representatives', {
    ...represent,
  })

  if (response.status > 400) throw new Error()
  return response
}
