import { publicApi } from '@/shared/api/public-api.config'
import { AgentRepresentativesValidatorType } from '../../model/agent.schema'

export const putEditRepresentativesAgent = async (
  represent: AgentRepresentativesValidatorType,
) => {
  const response = await publicApi.put(
    `v1/contractors/contractor-representatives/${represent.id}`,
    {
      ...represent,
    },
  )

  if (response.status > 400) throw new Error()
  return response
}
