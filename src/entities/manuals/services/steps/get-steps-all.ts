import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { StepResponseType } from '../../model/step.schema'

export const getStepsAll = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<StepResponseType>('v1/steps', {
    params: {
      ...params,
      ...filters,
    },
  })

  return response
}
