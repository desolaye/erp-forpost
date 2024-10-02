import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { AgentResponseType } from '../../model/agent.schema'

export const getAgentsManual = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<AgentResponseType>('v1/contractors', {
    params: {
      skip: params.skip,
      limit: params.limit,
      ...filters,
    },
  })

  return response
}
