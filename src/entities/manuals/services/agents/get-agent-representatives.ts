import { publicApi } from '@/shared/api/public-api.config'
import { AgentRepresentativesType } from '../../model/agent.schema'

export const getAgentRepresentatives = async (contractorId: string) => {
  const response = await publicApi.get<AgentRepresentativesType[]>(
    `v1/contractors/${contractorId}/contractor-representatives`,
  )

  if (response.status > 400) throw new Error()
  return response
}
