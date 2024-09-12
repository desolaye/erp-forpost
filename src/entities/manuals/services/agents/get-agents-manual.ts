import { publicApi } from '@/shared/api/public-api.config'
import { AgentResponseType } from '../../model/agent.schema'

interface IGetAgentsManual {
  params: {
    skip: number
    limit: number
  }
}

export const getAgentsManual = async (props: IGetAgentsManual) => {
  const { params } = props

  const response = await publicApi.get<AgentResponseType>('v1/contractors', { params })

  return response
}
