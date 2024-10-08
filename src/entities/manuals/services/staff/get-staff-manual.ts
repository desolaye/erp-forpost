import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { StaffResponseType } from '../../model/staff.manual'

export const getStaffManual = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<StaffResponseType>('v1/employees', {
    params: {
      ...params,
      ...filters,
    },
  })

  return response
}
