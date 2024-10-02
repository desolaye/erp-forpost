import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'
import { ProcessResponseType, ZProcessResponse } from '../../model/processes.schema'

export const getProcessesAll = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<ProcessResponseType>('v1/manufacturingProcesses', {
    params: {
      ...params,
      ...filters,
    },
  })

  const parsed = ZProcessResponse.safeParse(response.data)

  return parsed.data
}
