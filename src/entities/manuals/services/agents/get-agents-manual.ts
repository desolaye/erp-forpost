import { publicApi } from '@/shared/api/public-api.config'
import { AgentType } from '../../model/agent.schema'

export const getAgentsManual = async () => {
  const response = await publicApi.get<AgentType[]>('v1/contractors')
  return response
}
