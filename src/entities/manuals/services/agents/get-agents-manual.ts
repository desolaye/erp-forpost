import { publicApi } from '@/shared/api/public-api.config'

import { AgentResponseType } from '../../model/agent.schema'

type RequestProps = {
  skip?: number
  limit?: number
  contractorType?: number
  name?: string
}

export const getAgentsManual = async (props: RequestProps) => {
  const { contractorType, limit, name, skip } = props

  const response = await publicApi.get<AgentResponseType>('v1/contractors', {
    params: {
      Skip: skip,
      Limit: limit,
      Name: name,
      ContractorTypeValue: contractorType,
    },
  })

  if (response.status >= 400) throw new Error()
  return response
}
