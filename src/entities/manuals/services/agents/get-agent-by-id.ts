import { publicApi } from '@/shared/api/public-api.config'
import { AgentType } from '../../model/agent.schema'

export const getAgentByid = async (id: string) => {
  const response = await publicApi.get<AgentType>(`v1/contractors/${id}`)
  return response
}
