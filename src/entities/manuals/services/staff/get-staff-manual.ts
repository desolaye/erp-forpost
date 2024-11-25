import { publicApi } from '@/shared/api/public-api.config'
import { GetWithParamsType } from '@/shared/model/get-with-params.type'

import { StaffResponseType, ZStaffResponse } from '../../model/staff.manual'

export const getStaffManual = async (props: GetWithParamsType) => {
  const { params, filters } = props

  const response = await publicApi.get<StaffResponseType>('v1/employees', {
    params: {
      ...params,
      ...filters,
    },
  })

  const parsed = ZStaffResponse.safeParse(response.data)

  if (parsed.error) {
    console.log(parsed.error)
  }

  if (response.status >= 400) throw new Error()
  return parsed
}
